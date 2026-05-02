export type CodexForgeBrainGraphVersion = 2;

export type CodexForgeBrainNodeKind =
  | "workspace"
  | "project"
  | "conversation"
  | "repo"
  | "task"
  | "plan"
  | "step"
  | "run"
  | "snapshot"
  | "diff"
  | "memory"
  | "message"
  | "tag";

export type CodexForgeBrainEdgeKind =
  | "contains"
  | "relates_to"
  | "depends_on"
  | "derived_from"
  | "mentions"
  | "belongs_to"
  | "generated_by"
  | "generated"
  | "produced"
  | "executed_in"
  | "executed"
  | "references"
  | "about"
  | "about_repo"
  | "next_for"
  | "tagged_with";

export type CodexForgeBrainNodeStatus =
  | "idle"
  | "active"
  | "done"
  | "blocked"
  | "error"
  | "archived";

export type CodexForgeBrainNodeImportance =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type CodexForgeBrainSourceRefType =
  | "system"
  | "derived"
  | "chat-message"
  | "memory-item"
  | "active-task"
  | "execution-state";

export type CodexForgeBrainSourceRef = {
  type: CodexForgeBrainSourceRefType;
  id: string;
};

export type CodexForgeBrainNodeData = {
  label: string;
  description?: string;
  summary?: string;
  whyItMatters?: string;

  role?: "system" | "user" | "assistant";
  source?: string;
  ts?: number;

  repoPath?: string;
  workspaceRoot?: string;

  goal?: string;
  domain?: string;
  currentStep?: number;
  totalSteps?: number;
  completedSteps?: number;
  runningSteps?: number;
  errorSteps?: number;
  stepCount?: number;
  stepIndex?: number;
  nextAction?: string;
  result?: string;
  resultSummary?: string;
  lastRunAt?: number;
  lastMessageAt?: number;

  phase?: string;
  diffCount?: number;
  snapshotFileCount?: number;
  fileCount?: number;

  filePath?: string;
  patchPreview?: string;
  sampledPaths?: string[];
  diffTargets?: string[];
  logSummary?: string[];

  text?: string;
  content?: string;
  value?: string;
  memoryType?: string;
  tags?: string[];

  userMessageCount?: number;
  assistantMessageCount?: number;
  messageCount?: number;
};

export type CodexForgeBrainNodeMeta = {
  createdAt: number;
  updatedAt: number;
  status: CodexForgeBrainNodeStatus;
  importance: CodexForgeBrainNodeImportance;
  pinned?: boolean;
  sourceRefs?: CodexForgeBrainSourceRef[];
  version?: number;
};

export type CodexForgeBrainNode = {
  id: string;
  kind: CodexForgeBrainNodeKind;
  data: CodexForgeBrainNodeData;
  meta: CodexForgeBrainNodeMeta;
};

export type CodexForgeBrainEdgeMeta = {
  createdAt: number;
  updatedAt: number;
  weight?: number;
  sourceRefs?: CodexForgeBrainSourceRef[];
  version?: number;
};

export type CodexForgeBrainEdge = {
  id: string;
  from: string;
  to: string;
  kind: CodexForgeBrainEdgeKind;
  meta: CodexForgeBrainEdgeMeta;
};

export type CodexForgeBrainGraphMeta = {
  createdAt: number;
  updatedAt: number;
};

export type CodexForgeBrainGraph = {
  version: CodexForgeBrainGraphVersion;
  nodes: CodexForgeBrainNode[];
  edges: CodexForgeBrainEdge[];
  meta: CodexForgeBrainGraphMeta;
};

/* ================= LEGACY COMPAT TYPES ================= */

export type CodexForgeGraphNodeType = CodexForgeBrainNodeKind;
export type CodexForgeGraphEdgeType = CodexForgeBrainEdgeKind;
export type CodexForgeGraphNode = CodexForgeBrainNode;
export type CodexForgeGraphEdge = CodexForgeBrainEdge;