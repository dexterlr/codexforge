export const CODEXFORGE_BRAIN_GRAPH_VERSION = 1 as const;

export const BRAIN_NODE_KINDS = [
  "workspace",
  "project",
  "repo",
  "conversation",
  "message",
  "task",
  "plan",
  "step",
  "memory",
  "decision",
  "research",
  "artifact",
  "run",
  "diff",
  "snapshot",
  "tag",
  "person",
  "note",
] as const;

export const BRAIN_EDGE_KINDS = [
  "contains",
  "relates_to",
  "references",
  "depends_on",
  "blocks",
  "derived_from",
  "generated_by",
  "mentions",
  "part_of",
  "next_for",
  "about",
  "tagged_with",
  "executed_in",
  "produced",
  "uses",
  "summarizes",
] as const;

export const BRAIN_STATUS_VALUES = [
  "idle",
  "active",
  "done",
  "blocked",
  "error",
  "archived",
] as const;

export const BRAIN_IMPORTANCE_VALUES = [
  "low",
  "medium",
  "high",
  "critical",
] as const;

export type CodexForgeBrainNodeKind = (typeof BRAIN_NODE_KINDS)[number];
export type CodexForgeBrainEdgeKind = (typeof BRAIN_EDGE_KINDS)[number];
export type CodexForgeBrainStatus = (typeof BRAIN_STATUS_VALUES)[number];
export type CodexForgeBrainImportance = (typeof BRAIN_IMPORTANCE_VALUES)[number];

export type CodexForgeBrainId = string;
export type CodexForgeBrainNodeId = CodexForgeBrainId;
export type CodexForgeBrainEdgeId = CodexForgeBrainId;
export type CodexForgeBrainTimestamp = number;

export type CodexForgeBrainCoordinates = {
  x: number;
  y: number;
};

export type CodexForgeBrainSourceRef = {
  type:
    | "chat-message"
    | "active-task"
    | "memory-item"
    | "execution-state"
    | "history-entry"
    | "system"
    | "manual"
    | "derived";
  id: string;
};

export type CodexForgeBrainBaseMeta = {
  createdAt: CodexForgeBrainTimestamp;
  updatedAt: CodexForgeBrainTimestamp;
  status?: CodexForgeBrainStatus;
  importance?: CodexForgeBrainImportance;
  pinned?: boolean;
  archived?: boolean;
  sourceRefs?: CodexForgeBrainSourceRef[];
};

export type CodexForgeBrainWorkspaceNodeData = {
  label: string;
  description?: string;
  repoPath?: string;
};

export type CodexForgeBrainProjectNodeData = {
  label: string;
  description?: string;
  repoPath?: string;
  workspaceRoot?: string;
};

export type CodexForgeBrainRepoNodeData = {
  label: string;
  repoPath: string;
  branch?: string;
};

export type CodexForgeBrainConversationNodeData = {
  label: string;
  messageCount?: number;
  lastMessageAt?: number;
};

export type CodexForgeBrainMessageNodeData = {
  label: string;
  role: "system" | "user" | "assistant";
  text: string;
  source?: "api" | "local-fallback" | "system";
  ts: number;
};

export type CodexForgeBrainTaskNodeData = {
  label: string;
  goal: string;
  domain?: string;
  currentStep?: number;
  totalSteps?: number;
  tags?: string[];
};

export type CodexForgeBrainPlanNodeData = {
  label: string;
  goal: string;
  domain?: string;
  stepCount?: number;
  nextAction?: string;
  risks?: string[];
  files?: string[];
  commands?: string[];
  tags?: string[];
};

export type CodexForgeBrainStepNodeData = {
  label: string;
  text: string;
  stepIndex?: number;
  result?: string;
  lastRunAt?: number;
};

export type CodexForgeBrainMemoryNodeData = {
  label: string;
  memoryType: "fact" | "decision" | "task" | "note";
  content: string;
};

export type CodexForgeBrainDecisionNodeData = {
  label: string;
  summary: string;
  rationale?: string;
};

export type CodexForgeBrainResearchNodeData = {
  label: string;
  summary?: string;
  findings?: string[];
};

export type CodexForgeBrainArtifactNodeData = {
  label: string;
  artifactType?: string;
  path?: string;
  summary?: string;
};

export type CodexForgeBrainRunNodeData = {
  label: string;
  phase?: string;
  resultSummary?: string;
  diffCount?: number;
  snapshotFileCount?: number;
};

export type CodexForgeBrainDiffNodeData = {
  label: string;
  filePath: string;
  patchPreview?: string;
};

export type CodexForgeBrainSnapshotNodeData = {
  label: string;
  fileCount?: number;
  sampledPaths?: string[];
};

export type CodexForgeBrainTagNodeData = {
  label: string;
  value: string;
};

export type CodexForgeBrainPersonNodeData = {
  label: string;
  name: string;
  role?: string;
};

export type CodexForgeBrainNoteNodeData = {
  label: string;
  text: string;
};

export type CodexForgeBrainNodeDataMap = {
  workspace: CodexForgeBrainWorkspaceNodeData;
  project: CodexForgeBrainProjectNodeData;
  repo: CodexForgeBrainRepoNodeData;
  conversation: CodexForgeBrainConversationNodeData;
  message: CodexForgeBrainMessageNodeData;
  task: CodexForgeBrainTaskNodeData;
  plan: CodexForgeBrainPlanNodeData;
  step: CodexForgeBrainStepNodeData;
  memory: CodexForgeBrainMemoryNodeData;
  decision: CodexForgeBrainDecisionNodeData;
  research: CodexForgeBrainResearchNodeData;
  artifact: CodexForgeBrainArtifactNodeData;
  run: CodexForgeBrainRunNodeData;
  diff: CodexForgeBrainDiffNodeData;
  snapshot: CodexForgeBrainSnapshotNodeData;
  tag: CodexForgeBrainTagNodeData;
  person: CodexForgeBrainPersonNodeData;
  note: CodexForgeBrainNoteNodeData;
};

export type CodexForgeBrainNode<
  TKind extends CodexForgeBrainNodeKind = CodexForgeBrainNodeKind,
> = {
  id: CodexForgeBrainNodeId;
  kind: TKind;
  data: CodexForgeBrainNodeDataMap[TKind];
  meta: CodexForgeBrainBaseMeta;
  graph?: {
    collapsed?: boolean;
    hidden?: boolean;
    coordinates?: CodexForgeBrainCoordinates;
  };
};

export type CodexForgeBrainEdge = {
  id: CodexForgeBrainEdgeId;
  kind: CodexForgeBrainEdgeKind;
  from: CodexForgeBrainNodeId;
  to: CodexForgeBrainNodeId;
  label?: string;
  weight?: number;
  meta: CodexForgeBrainBaseMeta;
};

export type CodexForgeBrainGraph = {
  version: typeof CODEXFORGE_BRAIN_GRAPH_VERSION;
  nodes: CodexForgeBrainNode[];
  edges: CodexForgeBrainEdge[];
  meta: {
    createdAt: CodexForgeBrainTimestamp;
    updatedAt: CodexForgeBrainTimestamp;
    workspaceId?: string;
    projectId?: string;
  };
};

export type CodexForgeBrainGraphSnapshot = {
  version: typeof CODEXFORGE_BRAIN_GRAPH_VERSION;
  savedAt: CodexForgeBrainTimestamp;
  graph: CodexForgeBrainGraph;
};

export type CodexForgeBrainNodeInput<
  TKind extends CodexForgeBrainNodeKind = CodexForgeBrainNodeKind,
> = Omit<CodexForgeBrainNode<TKind>, "id" | "meta"> & {
  id?: CodexForgeBrainNodeId;
  meta?: Partial<CodexForgeBrainBaseMeta>;
};

export type CodexForgeBrainEdgeInput = Omit<CodexForgeBrainEdge, "id" | "meta"> & {
  id?: CodexForgeBrainEdgeId;
  meta?: Partial<CodexForgeBrainBaseMeta>;
};

export type CodexForgeBrainNodeLookup = Record<
  CodexForgeBrainNodeId,
  CodexForgeBrainNode
>;

export type CodexForgeBrainAdjacency = Record<
  CodexForgeBrainNodeId,
  CodexForgeBrainEdge[]
>;