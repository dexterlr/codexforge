import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeAgentRuntimeProfile } from "@/lib/codexforge/agents/runtime";
import type { CodexForgeBrainRuntimeSnapshot } from "../snapshot";
import type {
  CodexForgeBrainRuntimeContext,
  CodexForgeBrainRuntimeEvent,
} from "../runtime-types";
import type {
  CodexForgeMemoryCluster,
} from "../memory";
import type {
  CodexForgePredictiveContextResult,
  CodexForgePrioritizedRisk,
} from "../context";
import type {
  CodexForgeBrainLineageGraph,
  CodexForgeBrainReplayFrame,
  CodexForgeBrainReplayLane,
} from "../replay";
import type {
  CodexForgeKnowledgeTopology,
  CodexForgeSemanticHeatmap,
} from "../topology";
import type {
  CodexForgeInsightQueue,
  CodexForgeRuntimeRecommendation,
} from "../recommendations";
import type { CodexForgeRuntimeHealthDashboard } from "../health";
import type { CodexForgeBrainFocusModel } from "../focus";

export type CodexForgeBrainPanelId =
  | "graph"
  | "memory"
  | "risk"
  | "prediction"
  | "agents"
  | "replay"
  | "lineage"
  | "semantic-heatmap"
  | "knowledge-topology"
  | "recommendations"
  | "insight-queue"
  | "runtime-health"
  | "system-status"
  | "focus-mode"
  | "drilldown"
  | "live-snapshot";

export type CodexForgeBrainPanelDataSource =
  | "live"
  | "fixture"
  | "mixed"
  | "unavailable";

export type CodexForgeBrainPanelDataStatus =
  | "ready"
  | "partial"
  | "stale"
  | "empty"
  | "unavailable";

export type CodexForgeBrainPanelDataSeverity =
  | "info"
  | "low"
  | "medium"
  | "high"
  | "critical";

export type CodexForgeBrainPanelDataSignal = {
  id: string;
  panelId: CodexForgeBrainPanelId;
  label: string;
  detail: string;
  source: CodexForgeBrainPanelDataSource;
  status: CodexForgeBrainPanelDataStatus;
  severity: CodexForgeBrainPanelDataSeverity;
  score: number;
  timestamp: number;
  reason: string;
  evidence: readonly string[];
  nextSafeAction: string;
  readOnly: true;
  refs?: {
    nodeIds?: readonly string[];
    edgeIds?: readonly string[];
    eventIds?: readonly string[];
    filePaths?: readonly string[];
    sourceIds?: readonly string[];
  };
};

export type CodexForgeBrainPanelDataCounts = {
  live: number;
  fixture: number;
  total: number;
  nodes?: number;
  edges?: number;
  events?: number;
};

export type CodexForgeBrainPanelDataPayload = {
  graph?: CodexForgeBrainGraph;
  context?: CodexForgeBrainRuntimeContext;
  events?: readonly CodexForgeBrainRuntimeEvent[];
  memoryClusters?: readonly CodexForgeMemoryCluster[];
  predictiveContext?: CodexForgePredictiveContextResult;
  risks?: readonly CodexForgePrioritizedRisk[];
  replay?: {
    lanes: readonly CodexForgeBrainReplayLane[];
    frames: readonly CodexForgeBrainReplayFrame[];
  };
  lineage?: CodexForgeBrainLineageGraph;
  topology?: CodexForgeKnowledgeTopology;
  semanticHeatmap?: CodexForgeSemanticHeatmap;
  recommendations?: readonly CodexForgeRuntimeRecommendation[];
  insightQueue?: CodexForgeInsightQueue;
  health?: CodexForgeRuntimeHealthDashboard;
  focus?: CodexForgeBrainFocusModel;
  agents?: {
    profiles?: readonly CodexForgeAgentRuntimeProfile[];
  };
};

export type CodexForgeBrainPanelDataAdapterResult<
  TData extends CodexForgeBrainPanelDataPayload = CodexForgeBrainPanelDataPayload,
> = {
  panelId: CodexForgeBrainPanelId;
  source: CodexForgeBrainPanelDataSource;
  status: CodexForgeBrainPanelDataStatus;
  generatedAt: number;
  readOnly: true;
  signals: readonly CodexForgeBrainPanelDataSignal[];
  counts: CodexForgeBrainPanelDataCounts;
  evidence: readonly string[];
  reason: string;
  nextSafeAction: string;
  data?: TData;
};

export type CodexForgeBrainPanelDataReadiness = {
  panelId: CodexForgeBrainPanelId;
  source: CodexForgeBrainPanelDataSource;
  status: CodexForgeBrainPanelDataStatus;
  score: number;
  label: string;
  summary: string;
  evidence: readonly string[];
  nextSafeAction: string;
  readOnly: true;
};

export type CodexForgeBrainPanelIntegrationInput = {
  snapshot?: CodexForgeBrainRuntimeSnapshot | null;
  fixtureSnapshot?: CodexForgeBrainRuntimeSnapshot | null;
  fixtureAdapters?: Partial<
    Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataAdapterResult>
  >;
  now?: number;
  selectedNodeId?: string | null;
};

export type CodexForgeBrainPanelIntegrationSummary = {
  generatedAt: number;
  readOnly: true;
  totalPanels: number;
  score: number;
  livePanels: readonly CodexForgeBrainPanelId[];
  mixedPanels: readonly CodexForgeBrainPanelId[];
  fixturePanels: readonly CodexForgeBrainPanelId[];
  unavailablePanels: readonly CodexForgeBrainPanelId[];
  readyPanels: readonly CodexForgeBrainPanelId[];
  partialPanels: readonly CodexForgeBrainPanelId[];
  stalePanels: readonly CodexForgeBrainPanelId[];
  emptyPanels: readonly CodexForgeBrainPanelId[];
  unavailableStatusPanels: readonly CodexForgeBrainPanelId[];
  readiness: readonly CodexForgeBrainPanelDataReadiness[];
  text: string;
  nextSafeAction: string;
};

export const CODEXFORGE_BRAIN_PANEL_IDS: readonly CodexForgeBrainPanelId[] = [
  "graph",
  "memory",
  "risk",
  "prediction",
  "agents",
  "replay",
  "lineage",
  "semantic-heatmap",
  "knowledge-topology",
  "recommendations",
  "insight-queue",
  "runtime-health",
  "system-status",
  "focus-mode",
  "drilldown",
  "live-snapshot",
] as const;
