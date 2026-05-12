import type {
  CodexForgeFileNode,
  CodexForgeFileRiskLevel,
  CodexForgeFileRiskSignal,
  CodexForgeFileRiskSummary,
} from "./types";

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function levelFromScore(score: number): CodexForgeFileRiskLevel {
  if (score >= 82) return "critical";
  if (score >= 62) return "high";
  if (score >= 34) return "medium";
  return "low";
}

function signal(
  id: string,
  label: string,
  level: CodexForgeFileRiskLevel,
  score: number,
  reason: string
): CodexForgeFileRiskSignal {
  return { id, label, level, score: clampScore(score), reason };
}

export function calculateFileRisk(file: CodexForgeFileNode): CodexForgeFileRiskSummary {
  const signals: CodexForgeFileRiskSignal[] = [];
  const path = file.path.toLowerCase();

  if (path.includes("/app/api/") || path.endsWith("route.ts")) {
    signals.push(signal("route-server-code", "Route/server code", "high", 24, "Server boundaries can affect request handling and persistence."));
  }

  if (path.includes("/tools/") && /(write|apply|delete|patch|mutation|execute)/i.test(file.summary + file.tags.join(" "))) {
    signals.push(signal("mutation-tool", "Mutation tool surface", "critical", 28, "Tool code may cross from inspection into workspace mutation."));
  }

  if (path.includes("/brain/runtime/") || path.includes("/brain/graph/")) {
    signals.push(signal("runtime-core", "Runtime schema/core", "critical", 30, "Runtime files carry cognitive graph and execution contract risk."));
  }

  if (path.includes("scripts/smoke-")) {
    signals.push(signal("smoke-coverage", "Smoke coverage", "medium", -10, "Smoke scripts reduce regression risk when kept current."));
  }

  if (file.kind === "component" || path.endsWith(".tsx")) {
    signals.push(signal("ui-only", "UI-only surface", "low", -6, "UI-only changes are previewable and easier to isolate."));
  }

  if (file.kind === "docs") {
    signals.push(signal("docs-only", "Docs-only", "low", -18, "Documentation changes do not alter runtime behavior."));
  }

  if (!file.tags.includes("tested") && !path.includes("smoke-")) {
    signals.push(signal("missing-tests", "Missing tests", "medium", 14, "No direct smoke or test tag is attached to this file."));
  }

  if (file.dependencyIds.length >= 3) {
    signals.push(signal("high-coupling", "High coupling", "high", 18, "This file participates in several dependency relationships."));
  }

  const base = 22;
  const score = clampScore(base + signals.reduce((total, item) => total + item.score, 0));
  const level = levelFromScore(score);

  return {
    level,
    score,
    signals,
    summary: summarizeFileRisk({ level, score, signals }),
  };
}

export function summarizeFileRisk(risk: Pick<CodexForgeFileRiskSummary, "level" | "score" | "signals">): string {
  const drivers = risk.signals
    .filter((item) => item.score > 0)
    .slice(0, 3)
    .map((item) => item.label.toLowerCase());

  if (drivers.length === 0) {
    return `Risk is ${risk.level} at ${risk.score}/100 with no major escalation signals.`;
  }

  return `Risk is ${risk.level} at ${risk.score}/100 because of ${drivers.join(", ")}.`;
}
