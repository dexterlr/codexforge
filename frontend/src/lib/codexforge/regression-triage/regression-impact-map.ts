import {
  buildRegressionTriageStableKey,
  uniqueRegressionStrings,
  type RegressionImpactItem,
  type RegressionImpactMap,
  type RegressionRiskLevel,
  type RegressionSignal,
  type RegressionSurface,
} from "./regression-triage-types";

function isRegressionImpactMap(value: readonly RegressionImpactItem[] | RegressionImpactMap): value is RegressionImpactMap {
  return !Array.isArray(value);
}

function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, "/").toLowerCase();
}

function surfaceForPath(filePath: string): RegressionSurface {
  const path = normalizePath(filePath);
  if (path.includes("src/app/ai") || path.includes("/codexforge/chat")) return "/ai";
  if (path.includes("src/app/brain") || path.includes("/codexforge/brain")) return "/brain";
  if (path.includes("src/app/files") || path.includes("/codexforge/files")) return "/files";
  if (path.includes("src/app/tasks") || path.includes("/codexforge/task")) return "/tasks";
  if (path.includes("src/app/memory") || path.includes("/codexforge/memory") || path.includes("evidence-memory")) return "/memory";
  if (path.includes("src/app/artifacts") || path.includes("/codexforge/artifact")) return "/artifacts";
  if (path.includes("src/app/capabilities") || path.includes("/codexforge/capabilities")) return "/capabilities";
  if (path.includes("/api/") || path.endsWith("route.ts")) return "API route";
  if (path.startsWith("scripts/") || path.includes("smoke")) return "smoke suite";
  if (path.includes("src/lib/codexforge")) return "runtime/domain module";
  return "unknown";
}

function subsystemFor(surface: RegressionSurface, filePath: string): string {
  if (surface === "API route") return "route contract";
  if (surface === "smoke suite") return "verification smoke";
  if (surface === "runtime/domain module") return "deterministic domain logic";
  if (surface === "unknown") return "unknown subsystem";
  return `${surface} workspace surface`;
}

function riskFor(surface: RegressionSurface, signals: readonly RegressionSignal[]): RegressionRiskLevel {
  if (signals.some((signal) => signal.severity === "blocker")) return "critical";
  if (surface === "API route" || surface === "runtime/domain module") return "high";
  if (surface === "/brain" || surface === "/memory") return "high";
  if (signals.some((signal) => signal.severity === "error")) return "high";
  if (signals.some((signal) => signal.severity === "warning")) return "medium";
  return "low";
}

function smokeScriptsFor(filePath: string, surface: RegressionSurface): string[] {
  const path = normalizePath(filePath);
  const scripts = ["scripts/smoke-codexforge-regression-triage.ps1"];
  if (surface === "/ai") scripts.push("scripts/smoke-codexforge-grounded-fix-recommendation.ps1", "scripts/smoke-codexforge-patch-preview.ps1");
  if (surface === "/files") scripts.push("scripts/smoke-codexforge-files-suite.ps1", "scripts/smoke-codexforge-patch-preview.ps1");
  if (surface === "/tasks") scripts.push("scripts/smoke-codexforge-task-activation.ps1", "scripts/smoke-codexforge-read-only-step-execution.ps1");
  if (surface === "/memory") scripts.push("scripts/smoke-codexforge-evidence-memory.ps1");
  if (surface === "/brain") scripts.push("scripts/smoke-codexforge-brain-runtime.ps1");
  if (surface === "smoke suite" && path.endsWith(".ps1")) scripts.push(filePath);
  if (path.includes("mission-control")) scripts.push("scripts/smoke-codexforge-mission-control.ps1");
  return uniqueRegressionStrings(scripts);
}

export function buildRegressionImpactItem(args: {
  filePath: string;
  signals?: readonly RegressionSignal[] | null;
  whyImpacted?: string | null;
}): RegressionImpactItem {
  const relatedSignals = args.signals ?? [];
  const surface = surfaceForPath(args.filePath);
  const riskLevel = riskFor(surface, relatedSignals);

  return {
    filePath: args.filePath,
    routeOrSurface: surface,
    subsystem: subsystemFor(surface, args.filePath),
    riskLevel,
    whyImpacted:
      args.whyImpacted?.trim() ||
      "File is referenced by failed or warning regression signals and needs current inspection.",
    verificationNeeded: [
      "Inspect failed output first.",
      "Verify current files before trusting triage context.",
      "Review suggested smoke scripts; do not auto-run them from this UI.",
    ],
    rollbackRelevance:
      riskLevel === "critical" || riskLevel === "high"
        ? "Rollback may be relevant after review if the failure blocks build or smoke recovery."
        : "Prefer inspection and focused fix preview before rollback.",
    suggestedSmokeScripts: smokeScriptsFor(args.filePath, surface),
  };
}

export function buildRegressionImpactMap(args: {
  signals?: readonly RegressionSignal[] | null;
  changedFiles?: readonly string[] | null;
  targetFiles?: readonly string[] | null;
} = {}): RegressionImpactMap {
  const signals = args.signals ?? [];
  const files = uniqueRegressionStrings([
    ...signals.flatMap((signal) => signal.relatedFiles),
    ...(args.changedFiles ?? []),
    ...(args.targetFiles ?? []),
  ]);
  const items = files.map((filePath) =>
    buildRegressionImpactItem({
      filePath,
      signals: signals.filter((signal) => signal.relatedFiles.includes(filePath)),
    })
  );

  return {
    id: "regression-impact-map",
    items,
    summary: summarizeRegressionImpactMap(items),
  };
}

export function summarizeRegressionImpactMap(itemsOrMap: readonly RegressionImpactItem[] | RegressionImpactMap): string[] {
  const items: readonly RegressionImpactItem[] = isRegressionImpactMap(itemsOrMap)
    ? itemsOrMap.items
    : itemsOrMap;
  const smokeCount = uniqueRegressionStrings(items.flatMap((item) => item.suggestedSmokeScripts)).length;
  const criticalCount = items.filter((item) => item.riskLevel === "critical").length;

  return [
    `${items.length} impacted files mapped.`,
    `${criticalCount} impacted files are critical risk.`,
    `${smokeCount} suggested smoke scripts are listed for reviewed verification.`,
  ];
}
