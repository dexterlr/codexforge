import type {
  CodexForgeBrainRuntimeHealthReport,
} from "@/lib/codexforge/brain/runtime/runtime-health";
import type {
  CodexForgeBrainRuntimeDiagnostic,
} from "@/lib/codexforge/brain/runtime/runtime-diagnostics";
import type {
  CodexForgeBrainRuntimeContract,
} from "@/lib/codexforge/brain/runtime/runtime-contract";
import type {
  CodexForgeInsightQueue,
  CodexForgeRecommendationSummary,
  CodexForgeRuntimeRecommendation,
} from "@/lib/codexforge/brain/runtime/recommendations";
import type { CodexForgeTopologySummary } from "@/lib/codexforge/brain/runtime/topology";
import type { CodexForgeBrainReplaySummary } from "@/lib/codexforge/brain/runtime/replay";
import type { CodexForgePredictiveContextResult } from "@/lib/codexforge/brain/runtime/context";
import type { CodexForgeMemoryClusterSummary } from "@/lib/codexforge/brain/runtime/memory";
import type { CodexForgeAgentRuntimeState } from "@/lib/codexforge/agents/runtime";

export type CodexForgeRuntimeHealthSeverity =
  | "info"
  | "low"
  | "medium"
  | "high"
  | "critical";

export type CodexForgeRuntimeSubsystemStatus =
  | "ready"
  | "partial"
  | "degraded"
  | "blocked"
  | "unknown";

export type CodexForgeRuntimeSubsystemKind =
  | "graph-runtime"
  | "event-store"
  | "graph-reducer"
  | "context-assembler"
  | "cognitive-memory"
  | "predictive-context"
  | "files-runtime"
  | "agent-runtime"
  | "replay-lineage"
  | "semantic-topology"
  | "recommendations"
  | "health-dashboard"
  | "brain-ui"
  | "tool-policy"
  | "approval-boundary";

export type CodexForgeRuntimeNextSafeAction = {
  id: string;
  label: string;
  detail: string;
  readOnly: boolean;
  approvalRequired: boolean;
  blocked?: boolean;
};

export type CodexForgeRuntimeSubsystemReadiness = {
  id: CodexForgeRuntimeSubsystemKind;
  label: string;
  status: CodexForgeRuntimeSubsystemStatus;
  readinessScore: number;
  severity: CodexForgeRuntimeHealthSeverity;
  reasons: readonly string[];
  evidence: readonly string[];
  source: string;
  nextSafeAction: CodexForgeRuntimeNextSafeAction;
  stale?: boolean;
};

export type CodexForgeRuntimeSmokeCoverageItem = {
  id: string;
  label: string;
  status: CodexForgeRuntimeSubsystemStatus;
  coverageLevel: number;
  reason: string;
  evidence: readonly string[];
  nextSafeAction: CodexForgeRuntimeNextSafeAction;
};

export type CodexForgeRuntimeSafetyPosture = {
  id: string;
  status: CodexForgeRuntimeSubsystemStatus;
  severity: CodexForgeRuntimeHealthSeverity;
  summary: string;
  readOnlyActions: readonly CodexForgeRuntimeNextSafeAction[];
  approvalRequiredActions: readonly CodexForgeRuntimeNextSafeAction[];
  blockedActions: readonly CodexForgeRuntimeNextSafeAction[];
  boundaries: readonly {
    id: string;
    label: string;
    status: CodexForgeRuntimeSubsystemStatus;
    severity: CodexForgeRuntimeHealthSeverity;
    reason: string;
    approvalRequired: boolean;
  }[];
  warnings: readonly string[];
};

export type CodexForgeRuntimeHealthSignal = {
  id: string;
  title: string;
  detail: string;
  severity: CodexForgeRuntimeHealthSeverity;
  status: CodexForgeRuntimeSubsystemStatus;
  source: string;
  relatedSubsystem?: CodexForgeRuntimeSubsystemKind;
  evidence: readonly string[];
  reasons: readonly string[];
  nextSafeAction: CodexForgeRuntimeNextSafeAction;
};

export type CodexForgeRuntimeHealthSummary = {
  generatedAt: number;
  status: "ok" | "degraded" | "blocked";
  healthScore: number;
  text: string;
  warnings: readonly string[];
  risks: readonly string[];
  blockers: readonly string[];
  nextSafeAction: CodexForgeRuntimeNextSafeAction;
  topDegradedSubsystem?: CodexForgeRuntimeSubsystemReadiness;
  topBlockedSubsystem?: CodexForgeRuntimeSubsystemReadiness;
  topMissingSmokeCoverage?: CodexForgeRuntimeSmokeCoverageItem;
  topSafetyWarning?: string;
  topRuntimeDiagnostic?: CodexForgeRuntimeHealthSignal;
};

export type CodexForgeRuntimeHealthDashboard = {
  generatedAt: number;
  status: "ok" | "degraded" | "blocked";
  healthScore: number;
  summary: CodexForgeRuntimeHealthSummary;
  runtimeHealth?: CodexForgeBrainRuntimeHealthReport;
  runtimeContract?: CodexForgeBrainRuntimeContract;
  diagnostics: readonly CodexForgeRuntimeHealthSignal[];
  signals: readonly CodexForgeRuntimeHealthSignal[];
  subsystemReadiness: readonly CodexForgeRuntimeSubsystemReadiness[];
  smokeCoverage: readonly CodexForgeRuntimeSmokeCoverageItem[];
  safetyPosture: CodexForgeRuntimeSafetyPosture;
  warnings: readonly string[];
  risks: readonly string[];
  blockers: readonly string[];
  nextSafeActions: readonly CodexForgeRuntimeNextSafeAction[];
};

export type CodexForgeRuntimeHealthBuildInput = {
  generatedAt?: number;
  runtimeHealth?: CodexForgeBrainRuntimeHealthReport;
  runtimeDiagnostics?: readonly CodexForgeBrainRuntimeDiagnostic[];
  runtimeContract?: CodexForgeBrainRuntimeContract;
  recommendations?: readonly CodexForgeRuntimeRecommendation[];
  recommendationSummary?: CodexForgeRecommendationSummary;
  insightQueue?: CodexForgeInsightQueue;
  topologySummary?: CodexForgeTopologySummary;
  replaySummary?: CodexForgeBrainReplaySummary;
  memoryReadiness?: {
    status?: CodexForgeRuntimeSubsystemStatus;
    score?: number;
    clusters?: readonly CodexForgeMemoryClusterSummary[];
    evidence?: readonly string[];
  };
  contextReadiness?: {
    status?: CodexForgeRuntimeSubsystemStatus;
    score?: number;
    predictiveContext?: CodexForgePredictiveContextResult;
    evidence?: readonly string[];
  };
  agentRuntimeReadiness?: {
    status?: CodexForgeRuntimeSubsystemStatus;
    score?: number;
    state?: CodexForgeAgentRuntimeState;
    evidence?: readonly string[];
  };
  smokeCoverageDescriptors?: readonly {
    id: string;
    label?: string;
    present?: boolean;
    status?: CodexForgeRuntimeSubsystemStatus;
    coverageLevel?: number;
    reason?: string;
    evidence?: readonly string[];
  }[];
  subsystemOverrides?: readonly Partial<CodexForgeRuntimeSubsystemReadiness>[];
};
