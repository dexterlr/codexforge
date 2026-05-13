import type {
  CodexForgeBrainGraph,
  CodexForgeBrainNodeId,
  CodexForgeBrainTimestamp,
} from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainRuntimeEvent,
} from "@/lib/codexforge/brain/runtime/runtime-types";
import type {
  CodexForgeBrainLineageGraph,
} from "@/lib/codexforge/brain/runtime/replay";
import type {
  CodexForgeCognitiveMemoryScore,
  CodexForgeMemoryContradiction,
  CodexForgePromotableConcept,
} from "@/lib/codexforge/brain/runtime/memory";
import type { CodexForgePredictiveContextResult } from "@/lib/codexforge/brain/runtime/context";
import type { CodexForgeKnowledgeTopology } from "@/lib/codexforge/brain/runtime/topology";
import type {
  CodexForgeAgentRuntimeDecision,
  CodexForgeAgentRuntimeHandoff,
  CodexForgeAgentRuntimePlan,
  CodexForgeAgentRuntimeReview,
  CodexForgeAgentRuntimeTask,
} from "@/lib/codexforge/agents/runtime/agent-types";

export type CodexForgeRecommendationKind =
  | "inspect-risk"
  | "stabilize-runtime"
  | "curate-memory"
  | "resolve-contradiction"
  | "review-architecture"
  | "inspect-file-hotspot"
  | "verify-execution"
  | "review-agent-handoff"
  | "promote-concept"
  | "refresh-context"
  | "protect-approval-boundary"
  | "plan-next-step";

export type CodexForgeRecommendationSeverity =
  | "info"
  | "low"
  | "medium"
  | "high"
  | "critical";

export type CodexForgeRecommendationStatus =
  | "queued"
  | "recommended"
  | "needs-review"
  | "blocked"
  | "deferred"
  | "resolved";

export type CodexForgeRecommendationActionSafety =
  | "read-only"
  | "approval-required"
  | "blocked"
  | "deferred";

export type CodexForgeRecommendationEvidence = {
  id: string;
  label: string;
  source: "graph" | "event" | "memory" | "context" | "topology" | "agent" | "fixture";
  detail: string;
  nodeIds?: CodexForgeBrainNodeId[];
  eventIds?: string[];
  filePaths?: string[];
  score?: number;
  timestamp?: CodexForgeBrainTimestamp;
};

export type CodexForgeRecommendationAction = {
  id: string;
  label: string;
  description: string;
  safety: CodexForgeRecommendationActionSafety;
  approvalRequired: boolean;
  readOnly: boolean;
  blockedReason?: string;
};

export type CodexForgeRuntimeRecommendation = {
  id: string;
  kind: CodexForgeRecommendationKind;
  title: string;
  summary: string;
  whyItMatters: string;
  severity: CodexForgeRecommendationSeverity;
  status: CodexForgeRecommendationStatus;
  confidence: number;
  score: number;
  createdAt: CodexForgeBrainTimestamp;
  updatedAt: CodexForgeBrainTimestamp;
  reasons: string[];
  evidence: CodexForgeRecommendationEvidence[];
  relatedNodeIds: CodexForgeBrainNodeId[];
  relatedFilePaths: string[];
  sourceRefs: string[];
  nextSafeAction: CodexForgeRecommendationAction;
};

export type CodexForgeRuntimeInsight = {
  id: string;
  recommendationId: string;
  kind: CodexForgeRecommendationKind;
  title: string;
  detail: string;
  severity: CodexForgeRecommendationSeverity;
  status: CodexForgeRecommendationStatus;
  confidence: number;
  score: number;
  timestamp: CodexForgeBrainTimestamp;
  evidence: CodexForgeRecommendationEvidence[];
  relatedNodeIds: CodexForgeBrainNodeId[];
  relatedFilePaths: string[];
  action: CodexForgeRecommendationAction;
  whyItMatters: string;
};

export type CodexForgeInsightQueue = {
  generatedAt: CodexForgeBrainTimestamp;
  insights: CodexForgeRuntimeInsight[];
  groups: {
    byKind: Record<string, CodexForgeRuntimeInsight[]>;
    byStatus: Record<string, CodexForgeRuntimeInsight[]>;
    bySeverity: Record<string, CodexForgeRuntimeInsight[]>;
  };
  summary: {
    total: number;
    critical: number;
    high: number;
    needsReview: number;
    blocked: number;
    readOnlyActions: number;
    approvalRequiredActions: number;
  };
};

export type CodexForgeRecommendationBuildInput = {
  graph?: CodexForgeBrainGraph;
  events?: readonly CodexForgeBrainRuntimeEvent[];
  cognitiveMemory?: readonly CodexForgeCognitiveMemoryScore[];
  contradictionCandidates?: readonly CodexForgeMemoryContradiction[];
  promotableConcepts?: readonly CodexForgePromotableConcept[];
  predictiveContext?: CodexForgePredictiveContextResult;
  replayLineage?: CodexForgeBrainLineageGraph;
  semanticTopology?: CodexForgeKnowledgeTopology;
  runtimeHealth?: {
    status?: string;
    diagnostics?: readonly { id: string; severity?: string; message?: string }[];
  };
  agents?: {
    tasks?: readonly CodexForgeAgentRuntimeTask[];
    decisions?: readonly CodexForgeAgentRuntimeDecision[];
    handoffs?: readonly CodexForgeAgentRuntimeHandoff[];
    reviews?: readonly CodexForgeAgentRuntimeReview[];
    plans?: readonly CodexForgeAgentRuntimePlan[];
  };
  now?: CodexForgeBrainTimestamp;
  limit?: number;
};

export type CodexForgeRecommendationSummary = {
  generatedAt: CodexForgeBrainTimestamp;
  total: number;
  topRisk?: CodexForgeRuntimeRecommendation;
  topStaleContext?: CodexForgeRuntimeRecommendation;
  topContradiction?: CodexForgeRuntimeRecommendation;
  topMemoryPromotion?: CodexForgeRuntimeRecommendation;
  topArchitectureHotspot?: CodexForgeRuntimeRecommendation;
  topAgentReview?: CodexForgeRuntimeRecommendation;
  nextSafeAction?: CodexForgeRecommendationAction;
  severityCounts: Record<CodexForgeRecommendationSeverity, number>;
  readOnlyActions: number;
  approvalRequiredActions: number;
};
