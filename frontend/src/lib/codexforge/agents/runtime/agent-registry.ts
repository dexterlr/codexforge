import type {
  CodexForgeAgentRuntimeProfile,
  CodexForgeAgentRuntimeRole,
} from "./agent-types";

export const CODEXFORGE_AGENT_RUNTIME_VERSION = "5A.0.0" as const;

export const CODEXFORGE_AGENT_RUNTIME_ROLES = [
  "PlannerAgent",
  "ExecutionAgent",
  "VerificationAgent",
  "RefactorAgent",
  "ResearchAgent",
  "MemoryCuratorAgent",
  "GraphOptimizerAgent",
  "RiskAnalysisAgent",
] as const satisfies readonly CodexForgeAgentRuntimeRole[];

const PROFILES: readonly CodexForgeAgentRuntimeProfile[] = [
  {
    role: "PlannerAgent",
    label: "Planner Agent",
    capabilities: ["task-planning", "context-synthesis", "episode-bridging"],
    permission: "read-only",
    preferredEventTypes: ["task.created", "task.updated", "message.created"],
    reviewResponsibilities: ["scope clarity", "sequence safety"],
    safeBoundaries: ["Produces plans only.", "Does not mutate files or graph state."],
    reasons: ["Primary deterministic planner for ambiguous work."],
  },
  {
    role: "ExecutionAgent",
    label: "Execution Agent",
    capabilities: ["implementation-planning", "context-synthesis"],
    permission: "approval-required",
    preferredEventTypes: ["task.updated", "execution.started", "diff.generated"],
    reviewResponsibilities: ["write scope", "approval gate visibility"],
    safeBoundaries: ["Plans implementation steps only.", "No tool calls are made by runtime."],
    reasons: ["Owns proposed execution shape after routing."],
  },
  {
    role: "VerificationAgent",
    label: "Verification Agent",
    capabilities: ["verification-planning", "risk-analysis"],
    permission: "read-only",
    preferredEventTypes: ["execution.completed", "failure.detected", "recovery.detected"],
    reviewResponsibilities: ["validation coverage", "missing smoke checks"],
    safeBoundaries: ["Defines checks without running commands.", "Requires evidence before approval."],
    reasons: ["Mandatory reviewer for high-risk mutation routes."],
  },
  {
    role: "RefactorAgent",
    label: "Refactor Agent",
    capabilities: ["refactor-planning", "implementation-planning"],
    permission: "approval-required",
    preferredEventTypes: ["task.updated", "diff.generated"],
    reviewResponsibilities: ["blast radius", "contract preservation"],
    safeBoundaries: ["No broad rewrites without explicit approval.", "No schema replacement."],
    reasons: ["Handles scoped structural change proposals."],
  },
  {
    role: "ResearchAgent",
    label: "Research Agent",
    capabilities: ["local-research", "context-synthesis"],
    permission: "read-only",
    preferredEventTypes: ["message.created", "concept.synthesized"],
    reviewResponsibilities: ["source separation", "uncertainty clarity"],
    safeBoundaries: ["Uses provided local context only.", "No network or external API access."],
    reasons: ["Supports evidence synthesis from existing runtime data."],
  },
  {
    role: "MemoryCuratorAgent",
    label: "Memory Curator Agent",
    capabilities: ["memory-curation", "context-synthesis"],
    permission: "read-only",
    preferredEventTypes: ["memory.promoted", "concept.synthesized"],
    reviewResponsibilities: ["duplicate memory risk", "contradiction risk"],
    safeBoundaries: ["Suggests memory actions only.", "Does not promote memory directly."],
    reasons: ["Keeps cognitive memory surfaced without direct mutation."],
  },
  {
    role: "GraphOptimizerAgent",
    label: "Graph Optimizer Agent",
    capabilities: ["graph-optimization", "context-synthesis"],
    permission: "read-only",
    preferredEventTypes: ["concept.synthesized", "task.updated"],
    reviewResponsibilities: ["schema drift", "graph mutation safety"],
    safeBoundaries: ["Does not create graph schema.", "Does not mutate graph directly."],
    reasons: ["Reviews graph health using canonical graph summaries."],
  },
  {
    role: "RiskAnalysisAgent",
    label: "Risk Analysis Agent",
    capabilities: ["risk-analysis", "verification-planning"],
    permission: "read-only",
    preferredEventTypes: ["failure.detected", "recovery.detected", "task.updated"],
    reviewResponsibilities: ["external access risk", "mutation risk", "approval boundaries"],
    safeBoundaries: ["Blocks unsafe plans.", "Flags external access and direct mutation."],
    reasons: ["Mandatory reviewer for high-risk routes."],
  },
];

export function buildCodexForgeAgentRuntimeRegistry(): readonly CodexForgeAgentRuntimeProfile[] {
  return [...PROFILES].sort(
    (a, b) =>
      CODEXFORGE_AGENT_RUNTIME_ROLES.indexOf(a.role) -
      CODEXFORGE_AGENT_RUNTIME_ROLES.indexOf(b.role)
  );
}

export function getCodexForgeAgentRuntimeProfile(
  role: CodexForgeAgentRuntimeRole
): CodexForgeAgentRuntimeProfile | undefined {
  return buildCodexForgeAgentRuntimeRegistry().find((profile) => profile.role === role);
}

export function listCodexForgeAgentRuntimeProfiles(): readonly CodexForgeAgentRuntimeProfile[] {
  return buildCodexForgeAgentRuntimeRegistry();
}
