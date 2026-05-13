import type {
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph";
import type {
  CodexForgeBrainPanelDataAdapterResult,
  CodexForgeBrainPanelDataReadiness,
  CodexForgeBrainPanelId,
  CodexForgeBrainPanelIntegrationSummary,
  CodexForgeBrainQualitySummary,
  CodexForgeBrainRuntimeSnapshot,
} from "@/lib/codexforge/brain/runtime";

export type CodexForgeBrainCommandMode =
  | "memory"
  | "tasks"
  | "concepts"
  | "executions"
  | "architecture"
  | "timeline"
  | "risk"
  | "risks"
  | "agents"
  | "agent-activity"
  | "prediction"
  | "knowledge-clusters"
  | "semantic-heatmap"
  | "knowledge-topology"
  | "recommendations"
  | "insight-queue"
  | "focus-mode"
  | "drilldown"
  | "runtime-health"
  | "system-status"
  | "replay"
  | "lineage"
  | "live-snapshot"
  | "graph";

export type CodexForgeBrainCommandCenterMetric = {
  label: string;
  value: string;
  detail?: string;
};

export type CodexForgeBrainCommandCenterPanel = {
  id: CodexForgeBrainCommandMode;
  label: string;
  description: string;
};

export type CodexForgeBrainCommandCenterProps = {
  graph: CodexForgeBrainGraph;
  selectedNodeId: string | null;
  selectedNode?: CodexForgeBrainNode | null;
  onSelectNode: (nodeId: string) => void;
  runtimeSnapshot?: CodexForgeBrainRuntimeSnapshot | null;
  panelData?: Partial<
    Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataAdapterResult>
  >;
  panelReadiness?: Partial<
    Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataReadiness>
  >;
  panelIntegrationSummary?: CodexForgeBrainPanelIntegrationSummary | null;
  qualityGateSummary?: CodexForgeBrainQualitySummary | null;
};
