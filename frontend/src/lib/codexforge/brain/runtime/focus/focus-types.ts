import type {
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
  CodexForgeBrainNodeId,
  CodexForgeBrainTimestamp,
} from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainRuntimeEvent,
  CodexForgeBrainRuntimeSourceRef,
} from "../runtime-types";
import type {
  CodexForgeCognitiveMemoryScore,
  CodexForgePromotableConcept,
} from "../memory";
import type {
  CodexForgePredictiveContextResult,
  CodexForgePrioritizedRisk,
} from "../context";
import type {
  CodexForgeBrainLineageGraph,
  CodexForgeBrainReplayFrame,
} from "../replay";
import type {
  CodexForgeKnowledgeClusterNode,
  CodexForgeKnowledgeTopology,
  CodexForgeSemanticHeatmapCell,
} from "../topology";
import type {
  CodexForgeRuntimeHealthDashboard,
  CodexForgeRuntimeHealthSeverity,
  CodexForgeRuntimeSubsystemReadiness,
} from "../health";
import type {
  CodexForgeInsightQueue,
  CodexForgeRuntimeInsight,
  CodexForgeRuntimeRecommendation,
} from "../recommendations";
import type {
  CodexForgeAgentRuntimeHandoff,
  CodexForgeAgentRuntimePlan,
  CodexForgeAgentRuntimeReview,
  CodexForgeAgentRuntimeTask,
} from "@/lib/codexforge/agents/runtime";

export type CodexForgeBrainFocusTargetKind =
  | "graph-node"
  | "memory"
  | "concept"
  | "task"
  | "execution"
  | "diff"
  | "file"
  | "risk"
  | "recommendation"
  | "insight"
  | "agent"
  | "subsystem"
  | "topology-cluster"
  | "heatmap-cell";

export type CodexForgeBrainFocusSignalKind =
  | "memory"
  | "concept"
  | "task"
  | "execution"
  | "risk"
  | "file"
  | "architecture"
  | "agent"
  | "recommendation"
  | "insight"
  | "health"
  | "topology"
  | "replay"
  | "lineage"
  | "context"
  | "approval-boundary";

export type CodexForgeBrainFocusSeverity =
  | "info"
  | "low"
  | "medium"
  | "high"
  | "critical";

export type CodexForgeBrainFocusTarget = {
  id: string;
  kind: CodexForgeBrainFocusTargetKind;
  label: string;
  summary: string;
  status: string;
  severity: CodexForgeBrainFocusSeverity;
  relevance: number;
  updatedAt: CodexForgeBrainTimestamp;
  source: "graph" | "event" | "memory" | "context" | "topology" | "recommendation" | "health" | "agent" | "fixture";
  nodeId?: CodexForgeBrainNodeId;
  filePath?: string;
  sourceRefs: CodexForgeBrainRuntimeSourceRef[];
  reasons: string[];
  evidence: string[];
  readOnly: boolean;
  approvalRequired: boolean;
  nextSafeDrilldown: string;
  graphNode?: CodexForgeBrainNode;
  topologyCluster?: CodexForgeKnowledgeClusterNode;
  heatmapCell?: CodexForgeSemanticHeatmapCell;
  recommendation?: CodexForgeRuntimeRecommendation;
  insight?: CodexForgeRuntimeInsight;
  subsystem?: CodexForgeRuntimeSubsystemReadiness;
  agentTask?: CodexForgeAgentRuntimeTask;
};

export type CodexForgeBrainFocusSignal = {
  id: string;
  kind: CodexForgeBrainFocusSignalKind;
  label: string;
  summary: string;
  severity: CodexForgeBrainFocusSeverity;
  weight: number;
  relevance: number;
  timestamp: CodexForgeBrainTimestamp;
  targetId?: string;
  relatedTargetIds: string[];
  nodeIds: CodexForgeBrainNodeId[];
  eventIds: string[];
  filePaths: string[];
  sourceRefs: CodexForgeBrainRuntimeSourceRef[];
  reasons: string[];
  evidence: string[];
  readOnly: boolean;
  approvalRequired: boolean;
  nextSafeDrilldown: string;
};

export type CodexForgeBrainFocusNeighborhood = {
  focusTarget: CodexForgeBrainFocusTarget;
  signals: CodexForgeBrainFocusSignal[];
  groupedSignals: Record<CodexForgeBrainFocusSignalKind, CodexForgeBrainFocusSignal[]>;
  highlights: CodexForgeBrainFocusSignal[];
  relatedNodes: CodexForgeBrainFocusSignal[];
  relatedFiles: CodexForgeBrainFocusSignal[];
  relatedTasks: CodexForgeBrainFocusSignal[];
  relatedMemories: CodexForgeBrainFocusSignal[];
  relatedConcepts: CodexForgeBrainFocusSignal[];
  relatedRisks: CodexForgeBrainFocusSignal[];
  relatedRecommendations: CodexForgeBrainFocusSignal[];
  relatedAgents: CodexForgeBrainFocusSignal[];
  relatedExecutions: CodexForgeBrainFocusSignal[];
  nextSafeDrilldown: string;
};

export type CodexForgeBrainDrilldownStep = {
  id: string;
  label: string;
  kind: CodexForgeBrainFocusSignalKind | CodexForgeBrainFocusTargetKind;
  targetId: string;
  depth: number;
  summary: string;
  whyItMatters: string;
  relatedSurface: string;
  evidence: string[];
  readOnly: boolean;
  approvalRequired: boolean;
  nextSafeDrilldown: string;
};

export type CodexForgeBrainDrilldownPath = {
  id: string;
  label: string;
  summary: string;
  focusTargetId: string;
  steps: CodexForgeBrainDrilldownStep[];
  relatedSurfaces: string[];
  reasons: string[];
  readOnly: boolean;
  approvalRequired: boolean;
  nextSafeDrilldown: string;
};

export type CodexForgeBrainFocusBreadcrumb = {
  id: string;
  label: string;
  kind: CodexForgeBrainFocusSignalKind | CodexForgeBrainFocusTargetKind;
  targetId: string;
  depth: number;
  summary: string;
  readOnly: boolean;
};

export type CodexForgeBrainFocusLens = {
  id: string;
  title: string;
  kind: CodexForgeBrainFocusSignalKind;
  summary: string;
  relevance: number;
  severity: CodexForgeBrainFocusSeverity;
  evidence: string[];
  nextSafeDrilldown: string;
  signals: CodexForgeBrainFocusSignal[];
};

export type CodexForgeBrainFocusBuildInput = {
  graph?: CodexForgeBrainGraph;
  selectedNodeId?: string | null;
  events?: readonly CodexForgeBrainRuntimeEvent[];
  cognitiveMemory?: readonly CodexForgeCognitiveMemoryScore[];
  promotableConcepts?: readonly CodexForgePromotableConcept[];
  predictiveContext?: CodexForgePredictiveContextResult;
  prioritizedRisks?: readonly CodexForgePrioritizedRisk[];
  replayFrames?: readonly CodexForgeBrainReplayFrame[];
  replayLineage?: CodexForgeBrainLineageGraph;
  semanticTopology?: CodexForgeKnowledgeTopology;
  recommendations?: readonly CodexForgeRuntimeRecommendation[];
  insightQueue?: CodexForgeInsightQueue;
  runtimeHealth?: CodexForgeRuntimeHealthDashboard;
  agents?: {
    tasks?: readonly CodexForgeAgentRuntimeTask[];
    handoffs?: readonly CodexForgeAgentRuntimeHandoff[];
    reviews?: readonly CodexForgeAgentRuntimeReview[];
    plans?: readonly CodexForgeAgentRuntimePlan[];
  };
  now?: CodexForgeBrainTimestamp;
  limit?: number;
};

export type CodexForgeBrainFocusSummary = {
  generatedAt: CodexForgeBrainTimestamp;
  focusTarget: CodexForgeBrainFocusTarget;
  text: string;
  targetCount: number;
  signalCount: number;
  lensCount: number;
  pathCount: number;
  topSignalKinds: CodexForgeBrainFocusSignalKind[];
  nextSafeDrilldown: string;
  readOnly: boolean;
};

export type CodexForgeBrainFocusModel = {
  generatedAt: CodexForgeBrainTimestamp;
  focusTarget: CodexForgeBrainFocusTarget;
  targets: CodexForgeBrainFocusTarget[];
  signals: CodexForgeBrainFocusSignal[];
  neighborhood: CodexForgeBrainFocusNeighborhood;
  drilldownPaths: CodexForgeBrainDrilldownPath[];
  breadcrumbs: CodexForgeBrainFocusBreadcrumb[];
  lenses: CodexForgeBrainFocusLens[];
  summary: CodexForgeBrainFocusSummary;
  readOnly: boolean;
};

export type CodexForgeBrainFocusHealthSeverity = CodexForgeRuntimeHealthSeverity;
