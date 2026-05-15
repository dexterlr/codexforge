import {
  buildGroundedFixStableKey,
  type GroundedFixCandidate,
  type GroundedFixRiskBoard,
  type GroundedFixRiskFactor,
  type GroundedFixRiskLevel,
  type GroundedFixSignal,
} from "./grounded-fix-types";

function fileFactor(filePath: string): GroundedFixRiskFactor[] {
  const normalized = filePath.toLowerCase();
  const factors: GroundedFixRiskFactor[] = [];

  const add = (id: string, label: string, level: GroundedFixRiskLevel, score: number, detail: string) => {
    factors.push({ id: buildGroundedFixStableKey("risk", id, filePath), label, level, score, detail });
  };

  if (normalized.includes("/api/") || normalized.endsWith("route.ts")) add("route-api", "route/API file", "high", 24, "Route and API files can affect request behavior.");
  if (normalized.includes("tool-policy") || normalized.includes("policy")) add("policy", "policy file", "high", 22, "Policy files can change safety gates.");
  if (normalized.includes("runtime") || normalized.includes("execution-readiness")) add("runtime", "runtime/readiness file", "high", 22, "Runtime or readiness changes can alter execution posture.");
  if (normalized.includes("brain") || normalized.includes("runtime")) add("brain-runtime", "brain/runtime file", "critical", 30, "Brain runtime changes require extra review.");
  if (normalized.includes("memory") || normalized.includes("merge")) add("memory-merge", "memory/merge file", "high", 24, "Memory and merge files can affect authority and graph state.");
  if (normalized.includes("chat") || normalized.includes("use-codexforge-chat")) add("chat-route-hook", "chat route/hook", "high", 22, "Chat surfaces preserve latest-message authority.");
  if (normalized.includes("/app/") || normalized.includes("component") || normalized.endsWith(".tsx")) add("ui", "UI page/component", "medium", 12, "UI changes require visual and interaction review.");
  if (normalized.includes("smoke") || normalized.endsWith(".ps1")) add("smoke", "smoke script", "medium", 12, "Smoke scripts affect validation confidence.");

  return factors;
}

export function classifyGroundedFixRisk(score: number): GroundedFixRiskLevel {
  if (score >= 80) return "critical";
  if (score >= 52) return "high";
  if (score >= 24) return "medium";
  return "low";
}

export function scoreGroundedFixRisk(args: {
  targetFiles?: readonly string[];
  signals?: readonly GroundedFixSignal[];
  missingTestPlan?: boolean | null;
  mutationRequired?: boolean | null;
  broadImpact?: boolean | null;
}): number {
  const files = args.targetFiles ?? [];
  const signals = args.signals ?? [];
  let score = 0;

  for (const filePath of files) {
    score += fileFactor(filePath).reduce((total, factor) => total + factor.score, 0);
  }

  if (files.length > 1) score += Math.min(18, files.length * 4);
  if (signals.some((signal) => signal.weakWarnings.length > 0 || signal.confidence < 0.45)) score += 16;
  if (signals.some((signal) => signal.staleWarnings.length > 0)) score += 14;
  if (signals.some((signal) => signal.contradictionWarnings.length > 0)) score += 24;
  if (args.missingTestPlan) score += 14;
  if (args.mutationRequired) score += 16;
  if (args.broadImpact || files.length > 4) score += 18;

  return Math.min(100, score);
}

export function buildGroundedFixRiskBoard(args: {
  candidate: GroundedFixCandidate;
  signals?: readonly GroundedFixSignal[];
  missingTestPlan?: boolean | null;
}): GroundedFixRiskBoard {
  const factors: GroundedFixRiskFactor[] = [];
  for (const filePath of args.candidate.targetFiles) factors.push(...fileFactor(filePath));

  const signals = args.signals ?? [];
  if (args.candidate.targetFiles.length > 1) {
    factors.push({ id: "risk:multiple-target-files", label: "multiple target files", level: "medium", score: 14, detail: "More than one target file increases review scope." });
  }
  if (signals.some((signal) => signal.weakWarnings.length > 0)) {
    factors.push({ id: "risk:weak-evidence", label: "weak evidence", level: "medium", score: 16, detail: "Weak evidence must be treated as context, not proof." });
  }
  if (signals.some((signal) => signal.staleWarnings.length > 0)) {
    factors.push({ id: "risk:stale-evidence", label: "stale evidence", level: "medium", score: 14, detail: "Current files must be verified before any edit." });
  }
  if (signals.some((signal) => signal.contradictionWarnings.length > 0)) {
    factors.push({ id: "risk:contradiction-warning", label: "contradiction warning", level: "high", score: 24, detail: "Contradictory evidence requires investigation." });
  }
  if (args.missingTestPlan) {
    factors.push({ id: "risk:missing-test-plan", label: "missing test plan", level: "medium", score: 14, detail: "Recommendation needs explicit verification before handoff." });
  }
  factors.push({ id: "risk:mutation-required", label: "mutation required", level: "medium", score: 16, detail: "Actual file edits must route through Safe Patch Preview." });

  const score = Math.min(100, factors.reduce((total, factor) => total + factor.score, 0));
  const level = classifyGroundedFixRisk(score);
  return {
    id: "grounded-fix-risk-board",
    candidateId: args.candidate.id,
    level,
    score,
    factors: factors.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id)),
    summary: summarizeGroundedFixRisk({ level, score, factors }),
  };
}

export function summarizeGroundedFixRisk(risk: Pick<GroundedFixRiskBoard, "level" | "score" | "factors">): string[] {
  return [
    `Risk is ${risk.level} with score ${risk.score}.`,
    `${risk.factors.length} risk factors were detected, including route/API, policy, runtime, memory, chat, UI, and smoke risk factors when paths match.`,
    "Mutation remains blocked; Safe Patch Preview is required for edits.",
  ];
}
