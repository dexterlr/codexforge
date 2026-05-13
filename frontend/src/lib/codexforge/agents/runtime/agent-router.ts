import type {
  CodexForgeAgentRuntimeContext,
  CodexForgeAgentRuntimeDecision,
  CodexForgeAgentRuntimePermission,
  CodexForgeAgentRuntimeRole,
  CodexForgeAgentRuntimeTask,
} from "./agent-types";
import { CODEXFORGE_AGENT_RUNTIME_ROLES } from "./agent-registry";

const ROLE_DOMAIN: Record<CodexForgeAgentRuntimeRole, readonly string[]> = {
  PlannerAgent: ["planning"],
  ExecutionAgent: ["implementation"],
  VerificationAgent: ["verification"],
  RefactorAgent: ["refactor"],
  ResearchAgent: ["research"],
  MemoryCuratorAgent: ["memory"],
  GraphOptimizerAgent: ["graph"],
  RiskAnalysisAgent: ["risk"],
};

function uniqueRoles(roles: readonly CodexForgeAgentRuntimeRole[]): CodexForgeAgentRuntimeRole[] {
  const seen = new Set<CodexForgeAgentRuntimeRole>();
  return roles.filter((role) => {
    if (seen.has(role)) return false;
    seen.add(role);
    return true;
  });
}

function isHighRisk(task: CodexForgeAgentRuntimeTask): boolean {
  return task.risk === "high" || task.risk === "critical" || task.requestedAction === "mutate";
}

function permissionFor(task: CodexForgeAgentRuntimeTask): CodexForgeAgentRuntimePermission {
  if (task.risk === "critical") return "blocked";
  if (task.requestedAction === "mutate" || task.risk === "high") return "approval-required";
  return "read-only";
}

export function rankAgentRuntimeCandidates(input: {
  readonly task: CodexForgeAgentRuntimeTask;
  readonly context?: CodexForgeAgentRuntimeContext;
}): CodexForgeAgentRuntimeDecision["scores"] {
  return CODEXFORGE_AGENT_RUNTIME_ROLES.map((role) => {
    const reasons: string[] = [];
    let score = 0.2;
    if (ROLE_DOMAIN[role].includes(input.task.domain)) {
      score += 0.45;
      reasons.push(`domain:${input.task.domain}`);
    }
    if (input.task.requestedAction === "mutate" && role === "ExecutionAgent") {
      score += 0.24;
      reasons.push("requested-action:mutate");
    }
    if (input.task.requestedAction === "verify" && role === "VerificationAgent") {
      score += 0.3;
      reasons.push("requested-action:verify");
    }
    if (input.task.filePaths.some((path) => path.includes("/brain/runtime/")) && role === "RiskAnalysisAgent") {
      score += 0.18;
      reasons.push("runtime-boundary-risk");
    }
    if ((input.context?.topRisks.length ?? 0) > 0 && role === "RiskAnalysisAgent") {
      score += 0.22;
      reasons.push("context-risks-present");
    }
    if ((input.context?.memoryHints.length ?? 0) > 0 && role === "MemoryCuratorAgent") {
      score += 0.16;
      reasons.push("memory-hints-present");
    }
    if (input.task.domain === "graph" && role === "VerificationAgent") {
      score += 0.12;
      reasons.push("graph-changes-need-verification");
    }
    return {
      role,
      score: Number(Math.min(1, score).toFixed(4)),
      reasons: reasons.length ? reasons.sort() : ["baseline-runtime-candidate"],
    };
  }).sort(
    (a, b) =>
      b.score - a.score ||
      CODEXFORGE_AGENT_RUNTIME_ROLES.indexOf(a.role) -
        CODEXFORGE_AGENT_RUNTIME_ROLES.indexOf(b.role)
  );
}

export function explainAgentRoute(decision: CodexForgeAgentRuntimeDecision): string {
  return `${decision.primaryAgent} primary with ${decision.supportAgents.length} support agents and ${decision.reviewerAgents.length} reviewers. Risk ${decision.risk}, permission ${decision.permission}.`;
}

export function routeCodexForgeAgentTask(input: {
  readonly task: CodexForgeAgentRuntimeTask;
  readonly context?: CodexForgeAgentRuntimeContext;
}): CodexForgeAgentRuntimeDecision {
  const scores = rankAgentRuntimeCandidates(input);
  const primaryAgent = scores[0]?.role ?? "PlannerAgent";
  const supportAgents = uniqueRoles(
    scores
      .filter((score) => score.role !== primaryAgent && score.score >= 0.5)
      .map((score) => score.role)
      .concat(primaryAgent === "PlannerAgent" ? [] : ["PlannerAgent"])
  ).slice(0, 3);
  const reviewerAgents = uniqueRoles([
    ...(isHighRisk(input.task) ? ["VerificationAgent", "RiskAnalysisAgent"] as const : ["VerificationAgent"] as const),
    ...(input.task.domain === "graph" ? ["GraphOptimizerAgent"] as const : []),
  ]).filter((role) => role !== primaryAgent);
  const decision: CodexForgeAgentRuntimeDecision = {
    id: `agent-decision:${input.task.id}`,
    taskId: input.task.id,
    primaryAgent,
    supportAgents,
    reviewerAgents,
    permission: permissionFor(input.task),
    risk: input.task.risk,
    confidence: Number(Math.min(0.95, 0.55 + (scores[0]?.score ?? 0) * 0.35).toFixed(4)),
    scores,
    reasons: [
      ...scores[0]?.reasons ?? [],
      isHighRisk(input.task)
        ? "high-risk routes require VerificationAgent and RiskAnalysisAgent reviewers"
        : "standard verification reviewer included",
    ].sort(),
  };
  return { ...decision, reasons: [...decision.reasons, explainAgentRoute(decision)].sort() };
}
