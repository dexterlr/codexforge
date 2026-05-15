import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph";

export type BrainGraph3DMode = "3d" | "2d";
export type BrainGraph3DSignalDensity = "lean" | "rich";

export type BrainGraph3DVector = {
  x: number;
  y: number;
  z: number;
};

export type BrainGraph3DLayoutNode = {
  id: string;
  node: CodexForgeBrainNode;
  position: BrainGraph3DVector;
  radius: number;
  color: string;
  clusterKey: string;
  neighborCount: number;
  selected: boolean;
  related: boolean;
  dimmed: boolean;
  importanceRank: number;
};

export type BrainGraph3DLayoutEdge = {
  id: string;
  edge: CodexForgeBrainEdge;
  from: BrainGraph3DLayoutNode;
  to: BrainGraph3DLayoutNode;
  color: string;
  opacity: number;
  width: number;
  selected: boolean;
  related: boolean;
};

export type BrainGraph3DCluster = {
  key: string;
  label: string;
  color: string;
  center: BrainGraph3DVector;
  radius: number;
  count: number;
  selected: boolean;
};

export type BrainGraph3DSignalPoint = {
  id: string;
  position: BrainGraph3DVector;
  color: string;
  size: number;
  opacity: number;
};

export type BrainGraph3DLayout = {
  nodes: BrainGraph3DLayoutNode[];
  edges: BrainGraph3DLayoutEdge[];
  clusters: BrainGraph3DCluster[];
  signalField: BrainGraph3DSignalPoint[];
  selectedNode: BrainGraph3DLayoutNode | null;
  selectedNeighborIds: Set<string>;
  boundsRadius: number;
  layoutHash: string;
};

export type BrainGraph3DViewProps = {
  graph: CodexForgeBrainGraph;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onSwitchTo2D: () => void;
  onPreviousNode: () => void;
  onNextNode: () => void;
  onPreviousNeighbor: () => void;
  onNextNeighbor: () => void;
  onFocusNeighbors: () => void;
  selectedNeighborCount: number;
  activeNeighborLabel: string;
};

export type BrainGraph3DSceneCommand = {
  kind: "reset" | "focus-selected" | "fit-graph";
  sequence: number;
};
