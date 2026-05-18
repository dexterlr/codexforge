import {
  buildRegressionTriageStableKey,
  uniqueRegressionStrings,
  type RegressionClass,
  type RegressionClassification,
  type RegressionClassificationSummary,
  type RegressionSeverity,
  type RegressionSignal,
  type RegressionSurface,
  type RegressionUrgency,
} from "./regression-triage-types";

const classKeys: readonly RegressionClass[] = [
  "build-break",
  "smoke-break",
  "browser-console",
  "visual-layout",
  "data-contract",
  "route-contract",
  "safety-policy",
  "memory-ingestion",
  "patch-workflow",
  "unknown",
];

function textForSignals(signals: readonly RegressionSignal[]): string {
  return signals
    .map((signal) => `${signal.type} ${signal.title} ${signal.snippet} ${signal.relatedFiles.join(" ")} ${signal.sourceCommand ?? ""}`)
    .join(" ")
    .toLowerCase();
}

function surfaceFromFiles(files: readonly string[]): RegressionSurface {
  const text = files.join(" ").replace(/\\/g, "/").toLowerCase();
  if (text.includes("src/app/ai") || text.includes("/codexforge/chat")) return "/ai";
  if (text.includes("src/app/brain") || text.includes("/codexforge/brain")) return "/brain";
  if (text.includes("src/app/files") || text.includes("/codexforge/files")) return "/files";
  if (text.includes("src/app/tasks") || text.includes("/codexforge/task")) return "/tasks";
  if (text.includes("src/app/memory") || text.includes("/codexforge/memory") || text.includes("evidence-memory")) return "/memory";
  if (text.includes("src/app/artifacts") || text.includes("/codexforge/artifact")) return "/artifacts";
  if (text.includes("src/app/capabilities") || text.includes("/codexforge/capabilities")) return "/capabilities";
  if (text.includes("/api/") || text.endsWith("route.ts")) return "API route";
  if (text.includes("scripts/") || text.includes("smoke")) return "smoke suite";
  if (text.includes("src/lib/codexforge")) return "runtime/domain module";
  return "unknown";
}

function highestSeverity(signals: readonly RegressionSignal[]): RegressionSeverity {
  if (signals.some((signal) => signal.severity === "blocker")) return "blocker";
  if (signals.some((signal) => signal.severity === "error")) return "error";
  if (signals.some((signal) => signal.severity === "warning")) return "warning";
  return "info";
}

function classFromSignals(signals: readonly RegressionSignal[]): RegressionClass {
  const text = textForSignals(signals);
  if (signals.some((signal) => signal.type === "build-failure" || signal.type === "type-error")) return "build-break";
  if (signals.some((signal) => signal.type === "smoke-failure" || signal.type === "diff-check-failure")) return "smoke-break";
  if (signals.some((signal) => signal.type === "duplicate-react-key" || signal.type === "browser-warning")) return "browser-console";
  if (signals.some((signal) => signal.type === "ui-layout-regression")) return "visual-layout";
  if (signals.some((signal) => signal.type === "data-contract-regression" || signal.type === "mojibake-risk")) return "data-contract";
  if (signals.some((signal) => signal.type === "route-failure")) return "route-contract";
  if (signals.some((signal) => signal.type === "policy-regression")) return "safety-policy";
  if (text.includes("memory") || text.includes("evidence")) return "memory-ingestion";
  if (text.includes("patch") || text.includes("preview") || text.includes("apply")) return "patch-workflow";
  return "unknown";
}

function areaFromClass(regressionClass: RegressionClass, text: string): string {
  if (regressionClass === "build-break" && text.includes("type")) return "TypeScript contract or import/export boundary";
  if (regressionClass === "build-break") return "Build integration boundary";
  if (regressionClass === "smoke-break") return "Smoke script expectation or output marker";
  if (regressionClass === "browser-console") return "Browser console warning and React list rendering";
  if (regressionClass === "visual-layout") return "Responsive layout and overflow guards";
  if (regressionClass === "data-contract") return "Data, encoding, or payload contract";
  if (regressionClass === "route-contract") return "Route/API response contract";
  if (regressionClass === "safety-policy") return "Policy and approval boundary";
  if (regressionClass === "memory-ingestion") return "Evidence memory review or Brain merge handoff";
  if (regressionClass === "patch-workflow") return "Patch preview and apply gate workflow";
  return "Unknown regression area";
}

function urgencyFor(severity: RegressionSeverity, confidence: number): RegressionUrgency {
  if (severity === "blocker" && confidence >= 0.7) return "stop-and-stabilize";
  if (severity === "blocker") return "high";
  if (severity === "error") return "high";
  if (severity === "warning") return "medium";
  return "low";
}

export function classifyRegression(input: RegressionSignal | readonly RegressionSignal[]): RegressionClassification {
  const signals = Array.isArray(input) ? [...input] : [input];
  const severity = highestSeverity(signals);
  const regressionClass = classFromSignals(signals);
  const confidence =
    signals.length === 0
      ? 0
      : Math.min(1, signals.reduce((total, signal) => total + signal.confidence, 0) / signals.length + (signals.length > 1 ? 0.08 : 0));
  const text = textForSignals(signals);
  const files = uniqueRegressionStrings(signals.flatMap((signal) => signal.relatedFiles));
  const rollbackUrgency = urgencyFor(severity, confidence);
  const fixUrgency = regressionClass === "unknown" ? "medium" : urgencyFor(severity, Math.max(confidence, 0.58));

  return {
    id: buildRegressionTriageStableKey("regression-classification", regressionClass, severity, signals.map((signal) => signal.id).join("|") || "empty"),
    regressionClass,
    severity,
    confidence,
    suspectedArea: areaFromClass(regressionClass, text),
    likelyOwnerSurface: surfaceFromFiles(files),
    rollbackUrgency,
    fixUrgency,
    evidenceSnippets: signals.map((signal) => signal.snippet).filter(Boolean).slice(0, 4),
    reviewRequired: severity !== "info" || confidence < 0.72 || regressionClass === "unknown",
    signalIds: uniqueRegressionStrings(signals.map((signal) => signal.id)),
  };
}

export function classifyRegressionSignals(signals: readonly RegressionSignal[] = []): RegressionClassification[] {
  return signals.map((signal) => classifyRegression(signal));
}

export function summarizeRegressionClassification(
  classifications: readonly RegressionClassification[] = []
): RegressionClassificationSummary {
  const classCounts = classKeys.reduce<Record<RegressionClass, number>>((counts, key) => {
    counts[key] = classifications.filter((classification) => classification.regressionClass === key).length;
    return counts;
  }, {} as Record<RegressionClass, number>);
  const highest = highestSeverity(classifications.map((classification) => ({
    severity: classification.severity,
  } as RegressionSignal)));
  const reviewRequiredCount = classifications.filter((classification) => classification.reviewRequired).length;

  return {
    id: "regression-classification-summary",
    classificationCount: classifications.length,
    classCounts,
    highestSeverity: highest,
    reviewRequiredCount,
    summary: [
      `${classifications.length} regression classifications produced.`,
      `${reviewRequiredCount} classifications require review before any next action.`,
      `Highest severity is ${highest}.`,
    ],
  };
}
