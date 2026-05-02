export const CODEXFORGE_BRAIN_GRAPH_VERSION = 2 as const;

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
  "workflow",
  "generation",
  "video",
  "audio",
  "image",
  "model",
  "tool",
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
  "belongs_to",
  "triggered_by",
  "feeds",
  "outputs_to",
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

export const BRAIN_SOURCE_REF_TYPES = [
  "chat-message",
  "active-task",
  "memory-item",
  "execution-state",
  "history-entry",
  "system",
  "manual",
  "derived",
  "operator-run",
  "operator-diff",
  "operator-snapshot",
  "import",
] as const;

export type CodexForgeBrainNodeKind = (typeof BRAIN_NODE_KINDS)[number];
export type CodexForgeBrainEdgeKind = (typeof BRAIN_EDGE_KINDS)[number];
export type CodexForgeBrainStatus = (typeof BRAIN_STATUS_VALUES)[number];
export type CodexForgeBrainImportance = (typeof BRAIN_IMPORTANCE_VALUES)[number];
export type CodexForgeBrainSourceRefType = (typeof BRAIN_SOURCE_REF_TYPES)[number];

export type CodexForgeBrainId = string;
export type CodexForgeBrainNodeId = CodexForgeBrainId;
export type CodexForgeBrainEdgeId = CodexForgeBrainId;
export type CodexForgeBrainTimestamp = number;

export type CodexForgeBrainCoordinates = {
  x: number;
  y: number;
};

export type CodexForgeBrainSourceRef = {
  type: CodexForgeBrainSourceRefType;
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
  version?: number;
};

export type CodexForgeBrainGraphLayoutMeta = {
  collapsed?: boolean;
  hidden?: boolean;
  coordinates?: CodexForgeBrainCoordinates;
};

export type CodexForgeBrainBaseNodeData = {
  label: string;
  description?: string;
  summary?: string;
  whyItMatters?: string;

  repoPath?: string;
  workspaceRoot?: string;
  filePath?: string;
  path?: string;

  source?: string;
  sourceId?: string;
  sourceLabel?: string;

  tags?: string[];
  domain?: string;

  ts?: number;
  lastRunAt?: number;
  lastMessageAt?: number;
};

export type CodexForgeBrainWorkspaceNodeData = CodexForgeBrainBaseNodeData & {
  repoPath?: string;
  workspaceRoot?: string;
};

export type CodexForgeBrainProjectNodeData = CodexForgeBrainBaseNodeData & {
  repoPath?: string;
  workspaceRoot?: string;
};

export type CodexForgeBrainRepoNodeData = CodexForgeBrainBaseNodeData & {
  repoPath: string;
  branch?: string;
};

export type CodexForgeBrainConversationNodeData = CodexForgeBrainBaseNodeData & {
  messageCount?: number;
  userMessageCount?: number;
  assistantMessageCount?: number;
  lastMessageAt?: number;
};

export type CodexForgeBrainMessageNodeData = CodexForgeBrainBaseNodeData & {
  role: "system" | "user" | "assistant";
  text: string;
  source?: "api" | "local-fallback" | "system";
  ts: number;
};

export type CodexForgeBrainTaskNodeData = CodexForgeBrainBaseNodeData & {
  goal: string;
  currentStep?: number;
  totalSteps?: number;
  completedSteps?: number;
  runningSteps?: number;
  errorSteps?: number;
  nextAction?: string;
};

export type CodexForgeBrainPlanNodeData = CodexForgeBrainBaseNodeData & {
  goal: string;
  stepCount?: number;
  nextAction?: string;
  risks?: string[];
  files?: string[];
  commands?: string[];
};

export type CodexForgeBrainStepNodeData = CodexForgeBrainBaseNodeData & {
  text: string;
  stepIndex?: number;
  result?: string;
  resultSummary?: string;
  lastRunAt?: number;
};

export type CodexForgeBrainMemoryNodeData = CodexForgeBrainBaseNodeData & {
  memoryType: "fact" | "decision" | "task" | "note";
  content: string;
};

export type CodexForgeBrainDecisionNodeData = CodexForgeBrainBaseNodeData & {
  summary: string;
  rationale?: string;
  nextAction?: string;
};

export type CodexForgeBrainResearchNodeData = CodexForgeBrainBaseNodeData & {
  findings?: string[];
  nextAction?: string;
};

export type CodexForgeBrainArtifactNodeData = CodexForgeBrainBaseNodeData & {
  artifactType?: string;
  path?: string;
};

export type CodexForgeBrainRunNodeData = CodexForgeBrainBaseNodeData & {
  phase?: string;
  resultSummary?: string;
  diffCount?: number;
  snapshotFileCount?: number;
  fileCount?: number;
  logSummary?: string[];
};

export type CodexForgeBrainDiffNodeData = CodexForgeBrainBaseNodeData & {
  filePath: string;
  patchPreview?: string;
};

export type CodexForgeBrainSnapshotNodeData = CodexForgeBrainBaseNodeData & {
  fileCount?: number;
  sampledPaths?: string[];
};

export type CodexForgeBrainTagNodeData = CodexForgeBrainBaseNodeData & {
  value: string;
};

export type CodexForgeBrainPersonNodeData = CodexForgeBrainBaseNodeData & {
  name: string;
  role?: string;
};

export type CodexForgeBrainNoteNodeData = CodexForgeBrainBaseNodeData & {
  text: string;
};

export type CodexForgeBrainWorkflowNodeData = CodexForgeBrainBaseNodeData & {
  workflowType?: string;
  currentStage?: string;
  nextAction?: string;
};

export type CodexForgeBrainGenerationNodeData = CodexForgeBrainBaseNodeData & {
  generationType?: "text" | "image" | "audio" | "video" | "mixed";
  prompt?: string;
  model?: string;
  outputPath?: string;
  resultSummary?: string;
};

export type CodexForgeBrainVideoNodeData = CodexForgeBrainBaseNodeData & {
  prompt?: string;
  script?: string;
  durationSec?: number;
  outputPath?: string;
  statusSummary?: string;
};

export type CodexForgeBrainAudioNodeData = CodexForgeBrainBaseNodeData & {
  prompt?: string;
  transcript?: string;
  durationSec?: number;
  outputPath?: string;
};

export type CodexForgeBrainImageNodeData = CodexForgeBrainBaseNodeData & {
  prompt?: string;
  outputPath?: string;
  style?: string;
};

export type CodexForgeBrainModelNodeData = CodexForgeBrainBaseNodeData & {
  provider?: string;
  model?: string;
  modality?: string;
};

export type CodexForgeBrainToolNodeData = CodexForgeBrainBaseNodeData & {
  toolName?: string;
  toolType?: string;
  command?: string;
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
  workflow: CodexForgeBrainWorkflowNodeData;
  generation: CodexForgeBrainGenerationNodeData;
  video: CodexForgeBrainVideoNodeData;
  audio: CodexForgeBrainAudioNodeData;
  image: CodexForgeBrainImageNodeData;
  model: CodexForgeBrainModelNodeData;
  tool: CodexForgeBrainToolNodeData;
};

export type CodexForgeBrainNode<
  TKind extends CodexForgeBrainNodeKind = CodexForgeBrainNodeKind,
> = {
  id: CodexForgeBrainNodeId;
  kind: TKind;
  data: CodexForgeBrainNodeDataMap[TKind];
  meta: CodexForgeBrainBaseMeta;
  graph?: CodexForgeBrainGraphLayoutMeta;
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
    repoPath?: string;
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

/* ================= LEGACY COMPAT EXPORTS ================= */

export type CodexForgeGraphNodeType = CodexForgeBrainNodeKind;
export type CodexForgeGraphEdgeType = CodexForgeBrainEdgeKind;
export type CodexForgeGraphNode = CodexForgeBrainNode;
export type CodexForgeGraphEdge = CodexForgeBrainEdge;