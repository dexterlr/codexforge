import type {
  CodexForgeBrainBaseMeta,
  CodexForgeBrainEdge,
  CodexForgeBrainEdgeKind,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
  CodexForgeBrainNodeKind,
} from "@/lib/codexforge/brain/graph/types";

export type CodexForgeBrainMemorySourceCategory =
  | "workspace/root"
  | "app route"
  | "feature"
  | "subsystem"
  | "file"
  | "smoke"
  | "decision"
  | "plan"
  | "memory"
  | "task"
  | "concept"
  | "run/execution"
  | "doc"
  | "activity";

export type CodexForgeBrainMemoryActivityEntry = {
  id: string;
  date: string;
  title: string;
  summary?: string;
  category:
    | "note"
    | "plan"
    | "task"
    | "research"
    | "decision"
    | "execution"
    | "memory"
    | "legacy-metric";
  status?: "idea" | "active" | "done" | "blocked";
  tags?: string[];
  notes?: string;
};

export type CodexForgeBrainMemorySourceNode = {
  id: string;
  category: CodexForgeBrainMemorySourceCategory;
  nodeKind: CodexForgeBrainNodeKind;
  label: string;
  description?: string;
  summary: string;
  whyItMatters: string;
  tags?: string[];
  status?: CodexForgeBrainBaseMeta["status"];
  importance?: CodexForgeBrainBaseMeta["importance"];
  pinned?: boolean;
  createdAt?: number;
  updatedAt?: number;
  sourceId?: string;
  sourceLabel?: string;
  repoPath?: string;
  workspaceRoot?: string;
  filePath?: string;
  path?: string;
  domain?: string;
  data?: Record<string, unknown>;
  graph?: CodexForgeBrainNode["graph"];
  sourceRefType?: NonNullable<CodexForgeBrainBaseMeta["sourceRefs"]>[number]["type"];
  sourceRefId?: string;
};

export type CodexForgeBrainMemorySourceEdge = {
  id?: string;
  category: CodexForgeBrainMemorySourceCategory;
  from: string;
  to: string;
  edgeKind: CodexForgeBrainEdgeKind;
  label?: string;
  weight?: number;
  sourceLabel?: string;
  sourceRefType?: NonNullable<CodexForgeBrainBaseMeta["sourceRefs"]>[number]["type"];
  sourceRefId?: string;
};

export type CodexForgeBrainMemorySourceBuildInput = {
  activityEntries?: CodexForgeBrainMemoryActivityEntry[];
  now?: number;
};

export type CodexForgeBrainMemoryIngestionInput =
  CodexForgeBrainMemorySourceBuildInput & {
    existingGraph?: CodexForgeBrainGraph | null;
    sourceNodes?: CodexForgeBrainMemorySourceNode[];
    sourceEdges?: CodexForgeBrainMemorySourceEdge[];
  };

export type CodexForgeBrainMemoryIngestionPlan = {
  id: "codexforge-brain-memory-ingestion-phase-1";
  graph: CodexForgeBrainGraph;
  sourceNodes: CodexForgeBrainNode[];
  sourceEdges: CodexForgeBrainEdge[];
  summary: CodexForgeBrainMemoryIngestionSummary;
  readOnly: true;
  deterministic: true;
  repeatSafe: true;
};

export type CodexForgeBrainMemoryIngestionSummary = {
  sourceCount: number;
  sourceNodeCount: number;
  sourceEdgeCount: number;
  existingNodeCount: number;
  existingEdgeCount: number;
  projectedNodeAdditions: number;
  projectedEdgeAdditions: number;
  addedNodes: number;
  addedEdges: number;
  skippedNodes: number;
  skippedEdges: number;
  updatedNodes: number;
  updatedEdges: number;
  duplicateNodesRemoved: number;
  duplicateEdgesRemoved: number;
  idempotent: boolean;
  readOnly: true;
  sourceSafe: true;
};

export type CodexForgeBrainMemoryIngestionResult = {
  graph: CodexForgeBrainGraph;
  plan: CodexForgeBrainMemoryIngestionPlan;
  summary: CodexForgeBrainMemoryIngestionSummary;
};

export type CodexForgeBrainMemoryDedupeResult = {
  graph: CodexForgeBrainGraph;
  duplicateNodesRemoved: number;
  duplicateEdgesRemoved: number;
};

export type CodexForgeBrainMemoryGraphEntity =
  | CodexForgeBrainNode
  | CodexForgeBrainEdge;
