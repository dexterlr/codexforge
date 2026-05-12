import type {
  CodexForgeBrainEdge,
  CodexForgeBrainEdgeKind,
  CodexForgeBrainGraph,
  CodexForgeBrainImportance,
  CodexForgeBrainNode,
  CodexForgeBrainNodeId,
  CodexForgeBrainNodeKind,
  CodexForgeBrainStatus,
  CodexForgeBrainTimestamp,
} from "@/lib/codexforge/brain/graph/types";

export const CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES = [
  "message.created",
  "task.created",
  "task.updated",
  "execution.started",
  "execution.completed",
  "diff.generated",
  "memory.promoted",
  "concept.synthesized",
  "failure.detected",
  "recovery.detected",
] as const;

export type CodexForgeBrainRuntimeEventType =
  (typeof CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES)[number];

export type CodexForgeBrainRuntimeActor =
  | "user"
  | "assistant"
  | "system"
  | "tool"
  | "runtime";

export type CodexForgeBrainRuntimeSourceRef = {
  type: string;
  id: string;
  label?: string;
};

export type CodexForgeBrainRuntimeEventBase<
  TType extends CodexForgeBrainRuntimeEventType,
  TPayload,
> = {
  id: string;
  type: TType;
  ts: CodexForgeBrainTimestamp;
  actor?: CodexForgeBrainRuntimeActor;
  source?: CodexForgeBrainRuntimeSourceRef;
  correlationId?: string;
  causationId?: string;
  payload: TPayload;
  metadata?: Record<string, unknown>;
};

export type CodexForgeBrainMessageCreatedPayload = {
  messageId: string;
  conversationId?: string;
  role: "system" | "user" | "assistant";
  text: string;
  source?: "api" | "local-fallback" | "system";
  nodeId?: CodexForgeBrainNodeId;
};

export type CodexForgeBrainTaskCreatedPayload = {
  taskId: string;
  goal: string;
  domain?: string;
  tags?: string[];
  sourceMessageId?: string;
  nodeId?: CodexForgeBrainNodeId;
};

export type CodexForgeBrainTaskUpdatedPayload = {
  taskId: string;
  status?: CodexForgeBrainStatus;
  currentStep?: number;
  totalSteps?: number;
  completedSteps?: number;
  runningSteps?: number;
  errorSteps?: number;
  nextAction?: string;
  summary?: string;
  nodeId?: CodexForgeBrainNodeId;
};

export type CodexForgeBrainExecutionStartedPayload = {
  executionId: string;
  taskId?: string;
  runId?: string;
  label?: string;
  phase?: string;
  toolName?: string;
  command?: string;
  startedAt?: CodexForgeBrainTimestamp;
  nodeId?: CodexForgeBrainNodeId;
};

export type CodexForgeBrainExecutionCompletedPayload = {
  executionId: string;
  taskId?: string;
  runId?: string;
  status?: "completed" | "failed" | "cancelled";
  resultSummary?: string;
  completedAt?: CodexForgeBrainTimestamp;
  durationMs?: number;
  diffIds?: string[];
  snapshotIds?: string[];
  nodeId?: CodexForgeBrainNodeId;
};

export type CodexForgeBrainDiffGeneratedPayload = {
  diffId: string;
  executionId?: string;
  runId?: string;
  filePath: string;
  patchPreview?: string;
  status?: CodexForgeBrainStatus;
  nodeId?: CodexForgeBrainNodeId;
};

export type CodexForgeBrainMemoryPromotedPayload = {
  memoryId: string;
  content: string;
  memoryType: "fact" | "decision" | "task" | "note";
  importance?: number | CodexForgeBrainImportance;
  pinned?: boolean;
  taskId?: string;
  sourceNodeIds?: CodexForgeBrainNodeId[];
  nodeId?: CodexForgeBrainNodeId;
};

export type CodexForgeBrainConceptSynthesizedPayload = {
  conceptId: string;
  label: string;
  summary?: string;
  confidence?: number;
  sourceNodeIds?: CodexForgeBrainNodeId[];
  sourceEventIds?: string[];
  nodeId?: CodexForgeBrainNodeId;
};

export type CodexForgeBrainFailureDetectedPayload = {
  failureId: string;
  executionId?: string;
  taskId?: string;
  message: string;
  severity?: "low" | "medium" | "high" | "critical";
  recoverable?: boolean;
  nodeId?: CodexForgeBrainNodeId;
};

export type CodexForgeBrainRecoveryDetectedPayload = {
  recoveryId: string;
  failureId?: string;
  executionId?: string;
  taskId?: string;
  message: string;
  strategy?: string;
  nodeId?: CodexForgeBrainNodeId;
};

export type CodexForgeBrainRuntimeEventMap = {
  "message.created": CodexForgeBrainRuntimeEventBase<
    "message.created",
    CodexForgeBrainMessageCreatedPayload
  >;
  "task.created": CodexForgeBrainRuntimeEventBase<
    "task.created",
    CodexForgeBrainTaskCreatedPayload
  >;
  "task.updated": CodexForgeBrainRuntimeEventBase<
    "task.updated",
    CodexForgeBrainTaskUpdatedPayload
  >;
  "execution.started": CodexForgeBrainRuntimeEventBase<
    "execution.started",
    CodexForgeBrainExecutionStartedPayload
  >;
  "execution.completed": CodexForgeBrainRuntimeEventBase<
    "execution.completed",
    CodexForgeBrainExecutionCompletedPayload
  >;
  "diff.generated": CodexForgeBrainRuntimeEventBase<
    "diff.generated",
    CodexForgeBrainDiffGeneratedPayload
  >;
  "memory.promoted": CodexForgeBrainRuntimeEventBase<
    "memory.promoted",
    CodexForgeBrainMemoryPromotedPayload
  >;
  "concept.synthesized": CodexForgeBrainRuntimeEventBase<
    "concept.synthesized",
    CodexForgeBrainConceptSynthesizedPayload
  >;
  "failure.detected": CodexForgeBrainRuntimeEventBase<
    "failure.detected",
    CodexForgeBrainFailureDetectedPayload
  >;
  "recovery.detected": CodexForgeBrainRuntimeEventBase<
    "recovery.detected",
    CodexForgeBrainRecoveryDetectedPayload
  >;
};

export type CodexForgeBrainRuntimeEvent =
  CodexForgeBrainRuntimeEventMap[CodexForgeBrainRuntimeEventType];

export type CodexForgeBrainRuntimeEventInput<
  TEvent extends CodexForgeBrainRuntimeEvent = CodexForgeBrainRuntimeEvent,
> = TEvent extends CodexForgeBrainRuntimeEvent
  ? Omit<TEvent, "id" | "ts"> & Partial<Pick<TEvent, "id" | "ts">>
  : never;

export type CodexForgeBrainRuntimeEventFilter = {
  type?: CodexForgeBrainRuntimeEventType | CodexForgeBrainRuntimeEventType[];
  actor?: CodexForgeBrainRuntimeActor | CodexForgeBrainRuntimeActor[];
  since?: CodexForgeBrainTimestamp;
  until?: CodexForgeBrainTimestamp;
  relatedNodeId?: CodexForgeBrainNodeId;
  taskId?: string;
  executionId?: string;
  limit?: number;
};

export type CodexForgeBrainEventStore = {
  events: CodexForgeBrainRuntimeEvent[];
};

export type CodexForgeBrainAppendEventResult = {
  store: CodexForgeBrainEventStore;
  event: CodexForgeBrainRuntimeEvent;
};

export type CodexForgeBrainGraphReductionInput = {
  graph: CodexForgeBrainGraph;
  events: CodexForgeBrainRuntimeEvent[];
  now?: CodexForgeBrainTimestamp;
};

export type CodexForgeBrainRuntimeContextNode = {
  id: CodexForgeBrainNodeId;
  kind: CodexForgeBrainNodeKind;
  label: string;
  summary?: string;
  status?: CodexForgeBrainStatus;
  importance?: CodexForgeBrainImportance;
  pinned?: boolean;
  score: number;
};

export type CodexForgeBrainRuntimeContextEdge = Pick<
  CodexForgeBrainEdge,
  "id" | "kind" | "from" | "to" | "label" | "weight"
>;

export type CodexForgeBrainRuntimeContextEvent = {
  id: string;
  type: CodexForgeBrainRuntimeEventType;
  ts: CodexForgeBrainTimestamp;
  summary: string;
  nodeIds: CodexForgeBrainNodeId[];
};

export type CodexForgeBrainRuntimeContext = {
  generatedAt: CodexForgeBrainTimestamp;
  focusNodeIds: CodexForgeBrainNodeId[];
  summary: {
    nodeCount: number;
    edgeCount: number;
    eventCount: number;
    selectedNodeCount: number;
    selectedEventCount: number;
  };
  nodes: CodexForgeBrainRuntimeContextNode[];
  edges: CodexForgeBrainRuntimeContextEdge[];
  events: CodexForgeBrainRuntimeContextEvent[];
  memory: CodexForgeBrainRankedMemory[];
  goals: string[];
  failures: string[];
  outputs: string[];
};

export type CodexForgeBrainAssembleContextInput = {
  graph: CodexForgeBrainGraph;
  events?: CodexForgeBrainRuntimeEvent[];
  focusNodeIds?: CodexForgeBrainNodeId[];
  includeConnectedDepth?: number;
  maxNodes?: number;
  maxEdges?: number;
  maxEvents?: number;
  maxMemory?: number;
  now?: CodexForgeBrainTimestamp;
};

export type CodexForgeBrainRankMemoryInput = {
  graph: CodexForgeBrainGraph;
  events?: CodexForgeBrainRuntimeEvent[];
  focusNodeIds?: CodexForgeBrainNodeId[];
  includeKinds?: CodexForgeBrainNodeKind[];
  limit?: number;
  now?: CodexForgeBrainTimestamp;
};

export type CodexForgeBrainRankedMemory = {
  node: CodexForgeBrainNode;
  score: number;
  reasons: string[];
  updatedAt: CodexForgeBrainTimestamp;
  status?: CodexForgeBrainStatus;
  importance?: CodexForgeBrainImportance;
  pinned: boolean;
};

export type CodexForgeBrainEpisode = {
  id: string;
  goal: string;
  context: string[];
  actions: string[];
  failures: string[];
  recovery: string[];
  outputs: string[];
  learnedConcepts: string[];
  eventIds: string[];
  nodeIds: CodexForgeBrainNodeId[];
  startedAt?: CodexForgeBrainTimestamp;
  completedAt?: CodexForgeBrainTimestamp;
  createdAt: CodexForgeBrainTimestamp;
  metadata?: Record<string, unknown>;
};

export type CodexForgeBrainCreateEpisodeInput = {
  id?: string;
  goal: string;
  context?: string[];
  actions?: string[];
  failures?: string[];
  recovery?: string[];
  outputs?: string[];
  learnedConcepts?: string[];
  events?: CodexForgeBrainRuntimeEvent[];
  graph?: CodexForgeBrainGraph;
  focusNodeIds?: CodexForgeBrainNodeId[];
  startedAt?: CodexForgeBrainTimestamp;
  completedAt?: CodexForgeBrainTimestamp;
  createdAt?: CodexForgeBrainTimestamp;
  metadata?: Record<string, unknown>;
};

export type CodexForgeBrainConceptCandidate = {
  id: string;
  label: string;
  summary: string;
  confidence: number;
  signals: string[];
  sourceNodeIds: CodexForgeBrainNodeId[];
  sourceEventIds: string[];
};

export type CodexForgeBrainSynthesizeConceptsInput = {
  graph: CodexForgeBrainGraph;
  events?: CodexForgeBrainRuntimeEvent[];
  minSignals?: number;
  limit?: number;
};

export type CodexForgeBrainExecutionLineageLink = {
  from: string;
  to: string;
  kind: "task" | "execution" | "diff" | "snapshot" | "failure" | "recovery";
  relation: CodexForgeBrainEdgeKind | CodexForgeBrainRuntimeEventType;
  source: "graph" | "event";
};

export type CodexForgeBrainExecutionLineageRun = {
  executionId: string;
  runNodeId?: CodexForgeBrainNodeId;
  taskIds: string[];
  diffIds: string[];
  snapshotIds: string[];
  failureIds: string[];
  recoveryIds: string[];
  status?: CodexForgeBrainStatus | "completed" | "failed" | "cancelled";
  startedAt?: CodexForgeBrainTimestamp;
  completedAt?: CodexForgeBrainTimestamp;
  eventIds: string[];
};

export type CodexForgeBrainExecutionLineage = {
  runs: CodexForgeBrainExecutionLineageRun[];
  links: CodexForgeBrainExecutionLineageLink[];
};

export type CodexForgeBrainExecutionLineageInput = {
  graph: CodexForgeBrainGraph;
  events?: CodexForgeBrainRuntimeEvent[];
};

export type CodexForgeBrainSemanticRelationCandidate = {
  from: CodexForgeBrainNodeId;
  to: CodexForgeBrainNodeId;
  kind: CodexForgeBrainEdgeKind;
  score: number;
  reasons: string[];
};

export type CodexForgeBrainScoreSemanticLinksInput = {
  graph: CodexForgeBrainGraph;
  focusNodeIds?: CodexForgeBrainNodeId[];
  maxCandidates?: number;
  maxPairs?: number;
};
