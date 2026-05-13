import type {
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph";

export type CodexForgeBrainCommandMode =
  | "memory"
  | "tasks"
  | "concepts"
  | "executions"
  | "architecture"
  | "timeline"
  | "risks"
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
};
