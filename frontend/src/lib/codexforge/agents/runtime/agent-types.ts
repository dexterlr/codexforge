import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainCreateEpisodeInput,
  CodexForgeBrainRuntimeContext,
  CodexForgeBrainRuntimeEvent,
  CodexForgeBrainRuntimeEventType,
} from "@/lib/codexforge/brain/runtime/runtime-types";
import type { CodexForgePredictiveContextResult } from "@/lib/codexforge/brain/runtime/context";
import type {
  CodexForgeCognitiveMemoryScore,
  CodexForgeMemoryClusterSummary,
} from "@/lib/codexforge/brain/runtime/memory";

export type CodexForgeAgentRuntimeRole =
  | "PlannerAgent"
  | "ExecutionAgent"
  | "VerificationAgent"
  | "RefactorAgent"
  | "ResearchAgent"
  | "MemoryCuratorAgent"
  | "GraphOptimizerAgent"
  | "RiskAnalysisAgent";

export type CodexForgeAgentRuntimeCapability =
  | "task-planning"
  | "implementation-planning"
  | "verification-planning"
  | "refactor-planning"
  | "local-research"
  | "memory-curation"
  | "graph-optimization"
  | "risk-analysis"
  | "context-synthesis"
  | "episode-bridging";

export type CodexForgeAgentRuntimePermission =
  | "read-only"
  | "approval-required"
  | "blocked";

export type CodexForgeAgentRuntimeRisk = "low" | "medium" | "high" | "critical";
export type CodexForgeAgentRuntimeConfidence = number;
export type CodexForgeAgentRuntimeSeverity = "info" | "warning" | "error" | "critical";
export type CodexForgeAgentRuntimeTaskStatus =
  | "proposed"
  | "routed"
  | "planned"
  | "review-required"
  | "blocked";
export type CodexForgeAgentRuntimePlanStepStatus =
  | "read-only"
  | "approval-required"
  | "blocked";
export type CodexForgeAgentRuntimeReviewStatus =
  | "approved"
  | "changes-requested"
  | "blocked";

export type CodexForgeAgentRuntimeProfile = {
  readonly role: CodexForgeAgentRuntimeRole;
  readonly label: string;
  readonly capabilities: readonly CodexForgeAgentRuntimeCapability[];
  readonly permission: CodexForgeAgentRuntimePermission;
  readonly preferredEventTypes: readonly CodexForgeBrainRuntimeEventType[];
  readonly reviewResponsibilities: readonly string[];
  readonly safeBoundaries: readonly string[];
  readonly reasons: readonly string[];
};

export type CodexForgeAgentRuntimeMessage = {
  readonly id: string;
  readonly role: CodexForgeAgentRuntimeRole;
  readonly type:
    | "route"
    | "handoff"
    | "review"
    | "plan"
    | "context"
    | "risk";
  readonly createdAt: number;
  readonly taskId?: string;
  readonly correlationId?: string;
  readonly content: string;
  readonly eventType: CodexForgeBrainRuntimeEventType;
  readonly confidence: CodexForgeAgentRuntimeConfidence;
  readonly risk: CodexForgeAgentRuntimeRisk;
  readonly reasons: readonly string[];
  readonly metadata?: Record<string, unknown>;
};

export type CodexForgeAgentRuntimeTask = {
  readonly id: string;
  readonly goal: string;
  readonly domain:
    | "planning"
    | "implementation"
    | "verification"
    | "refactor"
    | "research"
    | "memory"
    | "graph"
    | "risk";
  readonly requestedAction:
    | "inspect"
    | "plan"
    | "mutate"
    | "verify"
    | "research"
    | "curate-memory"
    | "optimize-graph";
  readonly status: CodexForgeAgentRuntimeTaskStatus;
  readonly risk: CodexForgeAgentRuntimeRisk;
  readonly confidence: CodexForgeAgentRuntimeConfidence;
  readonly filePaths: readonly string[];
  readonly contextHints: readonly string[];
  readonly reasons: readonly string[];
  readonly createdAt: number;
};

export type CodexForgeAgentRuntimeDecision = {
  readonly id: string;
  readonly taskId: string;
  readonly primaryAgent: CodexForgeAgentRuntimeRole;
  readonly supportAgents: readonly CodexForgeAgentRuntimeRole[];
  readonly reviewerAgents: readonly CodexForgeAgentRuntimeRole[];
  readonly permission: CodexForgeAgentRuntimePermission;
  readonly risk: CodexForgeAgentRuntimeRisk;
  readonly confidence: CodexForgeAgentRuntimeConfidence;
  readonly scores: readonly {
    readonly role: CodexForgeAgentRuntimeRole;
    readonly score: number;
    readonly reasons: readonly string[];
  }[];
  readonly reasons: readonly string[];
};

export type CodexForgeAgentRuntimePlanStep = {
  readonly id: string;
  readonly agent: CodexForgeAgentRuntimeRole;
  readonly label: string;
  readonly status: CodexForgeAgentRuntimePlanStepStatus;
  readonly eventType: CodexForgeBrainRuntimeEventType;
  readonly reasons: readonly string[];
};

export type CodexForgeAgentRuntimePlan = {
  readonly id: string;
  readonly task: CodexForgeAgentRuntimeTask;
  readonly decision: CodexForgeAgentRuntimeDecision;
  readonly contextSummary: string;
  readonly readOnlySteps: readonly CodexForgeAgentRuntimePlanStep[];
  readonly approvalRequiredSteps: readonly CodexForgeAgentRuntimePlanStep[];
  readonly blockedSteps: readonly CodexForgeAgentRuntimePlanStep[];
  readonly handoffs: readonly CodexForgeAgentRuntimeHandoff[];
  readonly reviews: readonly CodexForgeAgentRuntimeReview[];
  readonly risks: readonly string[];
  readonly confidence: CodexForgeAgentRuntimeConfidence;
  readonly reasons: readonly string[];
};

export type CodexForgeAgentRuntimeReview = {
  readonly id: string;
  readonly reviewer: CodexForgeAgentRuntimeRole;
  readonly status: CodexForgeAgentRuntimeReviewStatus;
  readonly severity: CodexForgeAgentRuntimeSeverity;
  readonly summary: string;
  readonly recommendations: readonly string[];
  readonly requiredAgents: readonly CodexForgeAgentRuntimeRole[];
  readonly risk: CodexForgeAgentRuntimeRisk;
  readonly confidence: CodexForgeAgentRuntimeConfidence;
  readonly reasons: readonly string[];
};

export type CodexForgeAgentRuntimeHandoff = {
  readonly id: string;
  readonly from: CodexForgeAgentRuntimeRole;
  readonly to: CodexForgeAgentRuntimeRole;
  readonly taskId: string;
  readonly reason: string;
  readonly eventType: CodexForgeBrainRuntimeEventType;
  readonly permission: CodexForgeAgentRuntimePermission;
  readonly risk: CodexForgeAgentRuntimeRisk;
};

export type CodexForgeAgentRuntimeState = {
  readonly version: string;
  readonly registry: readonly CodexForgeAgentRuntimeProfile[];
  readonly tasks: readonly CodexForgeAgentRuntimeTask[];
  readonly messages: readonly CodexForgeAgentRuntimeMessage[];
  readonly decisions: readonly CodexForgeAgentRuntimeDecision[];
};

export type CodexForgeAgentRuntimeContextSignal = {
  readonly id: string;
  readonly kind:
    | "runtime-context"
    | "memory"
    | "predictive-context"
    | "graph"
    | "task-focus"
    | "risk";
  readonly label: string;
  readonly score: number;
  readonly confidence: CodexForgeAgentRuntimeConfidence;
  readonly reasons: readonly string[];
};

export type CodexForgeAgentRuntimeContext = {
  readonly generatedAt: number;
  readonly summary: string;
  readonly signals: readonly CodexForgeAgentRuntimeContextSignal[];
  readonly topRisks: readonly string[];
  readonly memoryHints: readonly string[];
  readonly taskFocus: readonly string[];
  readonly graphSummary?: {
    readonly nodeCount: number;
    readonly edgeCount: number;
    readonly eventCount: number;
  };
  readonly reasons: readonly string[];
};

export type CodexForgeAgentRuntimeOrchestrationInput = {
  readonly task: CodexForgeAgentRuntimeTask;
  readonly runtimeContext?: CodexForgeBrainRuntimeContext;
  readonly cognitiveMemory?: readonly CodexForgeCognitiveMemoryScore[];
  readonly memoryClusters?: readonly CodexForgeMemoryClusterSummary[];
  readonly predictiveContext?: CodexForgePredictiveContextResult;
  readonly graph?: CodexForgeBrainGraph;
  readonly events?: readonly CodexForgeBrainRuntimeEvent[];
  readonly now?: number;
};

export type CodexForgeAgentRuntimeOrchestrationResult = {
  readonly plan: CodexForgeAgentRuntimePlan;
  readonly context: CodexForgeAgentRuntimeContext;
  readonly episodeInput: CodexForgeBrainCreateEpisodeInput;
  readonly messages: readonly CodexForgeAgentRuntimeMessage[];
  readonly events: readonly CodexForgeBrainRuntimeEvent[];
  readonly summary: string;
};
