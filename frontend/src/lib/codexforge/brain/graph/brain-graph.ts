export type CodexForgeGraphNodeType =
  | "task"
  | "plan"
  | "step"
  | "memory"
  | "message"
  | "execution"
  | "decision"
  | "research"
  | "repo"
  | "tag";

export type CodexForgeGraphEdgeType =
  | "relates_to"
  | "depends_on"
  | "derived_from"
  | "mentions"
  | "belongs_to"
  | "generated"
  | "executed"
  | "tagged_with"
  | "about_repo";

export type CodexForgeGraphNode = {
  id: string;
  type: CodexForgeGraphNodeType;
  label: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  weight?: number;
  metadata?: Record<string, unknown>;
};

export type CodexForgeGraphEdge = {
  id: string;
  from: string;
  to: string;
  type: CodexForgeGraphEdgeType;
  weight?: number;
  createdAt: number;
  updatedAt: number;
  metadata?: Record<string, unknown>;
};

export type CodexForgeBrainGraph = {
  nodes: CodexForgeGraphNode[];
  edges: CodexForgeGraphEdge[];
};