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
  const searchable = `${file.path} ${file.name} ${file.summary} ${file.tags.join(" ")}`.toLowerCase();

  if (path.includes("/app/api/") || path.endsWith("route.ts")) {
    signals.push(signal("route-server-code", "API route/server code", "high", 30, "Server boundaries can affect request handling, data exposure, and persistence."));
  }

  if (path.includes("/tools/") && /(write|apply|delete|patch|mutation|execute|run|test|build)/i.test(searchable)) {
    signals.push(signal("mutation-tool", "Mutation-capable tool surface", "high", 34, "Tool code may cross from inspection into workspace mutation or command execution."));
  }

  if (/(write|apply|delete|patch|overwrite|run-command|run-tests|build-web-app|generate-diff)/i.test(searchable)) {
    signals.push(signal("write-run-build-keyword", "Write/run/build keyword", "high", 24, "The path or summary mentions a mutation, command, test, or build boundary."));
  }

  if (/(auth|safety|policy|approval|permission|guard)/i.test(searchable)) {
    signals.push(signal("safety-policy-code", "Auth/safety/policy code", "high", 26, "Safety and approval code controls operator trust boundaries."));
  }

  if (path.includes("/brain/runtime/") || path.includes("/brain/graph/") || path.includes("/memory/")) {
    signals.push(signal("runtime-core", "Runtime/graph/memory surface", "medium", 18, "Runtime files carry cognitive graph, memory, and execution contract risk."));
  }

  if (path.includes("/chat/") && /(state|composer|message|runtime|panel)/i.test(searchable)) {
    signals.push(signal("chat-state", "Chat state surface", "medium", 16, "Chat state and runtime panels influence operator context and decisions."));
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
