import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeCognitiveMemoryScore,
  CodexForgeMemoryClusterSummary,
  CodexForgeMemoryContradiction,
} from "../memory";
import type {
  CodexForgePredictiveContextResult,
  CodexForgePredictiveContextSignal,
  CodexForgePrioritizedRisk,
} from "../context";
import type {
  CodexForgeBrainLineageGraph,
  CodexForgeBrainReplayFrame,
} from "../replay";
import type {
  CodexForgeBrainRankedMemory,
  CodexForgeBrainRuntimeEvent,
} from "../runtime-types";
import type { CodexForgeAgentRuntimePlan } from "@/lib/codexforge/agents/runtime";

export type CodexForgeTopologySignalKind =
  | "memory"
  | "concept"
  | "task"
  | "execution"
  | "risk"
  | "file"
  | "architecture"
  | "agent"
  | "prediction"
  | "contradiction"
  | "recovery";

export type CodexForgeSemanticHeatmapCell = {
  id: string;
  label: string;
  kind: CodexForgeTopologySignalKind;
  intensity: number;
  risk: number;
  confidence: number;
  density: number;
  reasons: string[];
  supportingSignals: string[];
  refs: {
    nodeIds?: string[];
    eventIds?: string[];
    filePaths?: string[];
    clusterIds?: string[];
  };
};

export type CodexForgeSemanticHeatmapLayer = {
  id:
    | "memory-density"
    | "risk-intensity"
    | "concept-strength"
    | "execution-activity"
    | "agent-activity"
    | "prediction-relevance"
    | "architecture-hotspots"
    | "contradiction-pressure";
  label: string;
  description: string;
  cells: CodexForgeSemanticHeatmapCell[];
};

export type CodexForgeSemanticHeatmap = {
  generatedAt: number;
  layers: CodexForgeSemanticHeatmapLayer[];
  summary: CodexForgeTopologySummary;
};

export type CodexForgeKnowledgeClusterNode = {
  id: string;
  label: string;
  kind: CodexForgeTopologySignalKind;
  weight: number;
  density: number;
  risk: number;
  memoryDensity: number;
  conceptStrength: number;
  confidence: number;
  status: string;
  tags: string[];
  keywords: string[];
  sourceRefs: string[];
  supportingSignals: string[];
  reasons: string[];
  nodeIds: string[];
  eventIds: string[];
  filePaths: string[];
  nextSafeAction: string;
};

export type CodexForgeKnowledgeClusterEdge = {
  id: string;
  from: string;
  to: string;
  weight: number;
  relation: "shared-tags" | "shared-kind" | "shared-source" | "shared-path" | "lineage" | "risk";
  reasons: string[];
};

export type CodexForgeKnowledgeTopology = {
  generatedAt: number;
  clusters: CodexForgeKnowledgeClusterNode[];
  edges: CodexForgeKnowledgeClusterEdge[];
  layout: CodexForgeTopologyLayoutPoint[];
  summary: CodexForgeTopologySummary;
};

export type CodexForgeTopologyLayoutPoint = {
  id: string;
  x: number;
  y: number;
  radius: number;
  lane: number;
  weight: number;
  label: string;
};

export type CodexForgeTopologyBuildInput = {
  graph: CodexForgeBrainGraph;
  events?: readonly CodexForgeBrainRuntimeEvent[];
  rankedMemory?: readonly CodexForgeBrainRankedMemory[];
  cognitiveMemory?: readonly CodexForgeCognitiveMemoryScore[];
  memoryClusters?: readonly CodexForgeMemoryClusterSummary[];
  contradictions?: readonly CodexForgeMemoryContradiction[];
  predictiveContext?: CodexForgePredictiveContextResult;
  contextSignals?: readonly CodexForgePredictiveContextSignal[];
  prioritizedRisks?: readonly CodexForgePrioritizedRisk[];
  replayFrames?: readonly CodexForgeBrainReplayFrame[];
  lineage?: CodexForgeBrainLineageGraph;
  agentPlan?: CodexForgeAgentRuntimePlan;
  now?: number;
};

export type CodexForgeTopologySummary = {
  status: "ready" | "fixture" | "empty";
  text: string;
  hotspotCount: number;
  densestMemoryRegions: string[];
  highestRiskHotspots: string[];
  strongestConceptClusters: string[];
  staleOrContradictoryAreas: string[];
  executionHotspots: string[];
  agentActivityHotspots: string[];
  architectureHotspots: string[];
  nextSafeAction: string;
};

export type CodexForgeTopologySignal = {
  id: string;
  label: string;
  kind: CodexForgeTopologySignalKind;
  score: number;
  risk: number;
  confidence: number;
  timestamp: number;
  tags: string[];
  keywords: string[];
  sourceRefs: string[];
  reasons: string[];
  nodeIds: string[];
  eventIds: string[];
  filePaths: string[];
  graphNodes?: readonly CodexForgeBrainNode[];
  graphEdges?: readonly CodexForgeBrainEdge[];
};
