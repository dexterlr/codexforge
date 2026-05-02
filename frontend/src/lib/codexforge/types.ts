export type CodexForgeRole = "system" | "user" | "assistant";

/* ================= CORE ENUMS ================= */

export type CodexForgePlanStatus =
  | "draft"
  | "active"
  | "completed"
  | "executed"
  | "blocked"
  | "needs-approval";

export type CodexForgePlanDomain =
  | "general"
  | "web"
  | "research"
  | "debug"
  | "game-server"
  | "movie"
  | "video"
  | "comfyui"
  | "unreal"
  | "automation";

export type CodexForgeExecutionRequestMode = "execute-task-step";

export type CodexForgeExecutionPhase =
  | "idle"
  | "planning"
  | "awaiting_plan_approval"
  | "diffing"
  | "awaiting_diff_approval"
  | "applying"
  | "testing"
  | "done"
  | "error"
  | "fallback";

export type CodexForgeStructuredToolAvailability =
  | "unavailable"
  | "stub"
  | "ready";

export type CodexForgeMessageSource = "api" | "local-fallback" | "system";

export type CodexForgeMemoryType = "fact" | "decision" | "task" | "note";

export type CodexForgeChatMode =
  | "local"
  | "local-fallback"
  | "local-execution"
  | "local-execution-fallback"
  | "remote";

export type CodexForgeStructuredReplyMode =
  | "local"
  | "local-fallback"
  | "local-execution"
  | "local-execution-fallback";

export type CodexForgeStructuredStatusSignal =
  | "Grounded repository evidence is available."
  | "Execution handled by UI-side engine fallback."
  | "Backend route was unavailable or returned an error."
  | "Task step was processed locally for continuity."
  | "Using UI-side engine fallback."
  | "Auto tool executed: read-file"
  | "Auto tool executed: list-files"
  | "Auto tool executed: search-project"
  | "Follow-up tool executed: read-file"
  | "Follow-up tool executed: list-files"
  | "Follow-up tool executed: search-project";

/* ================= GRAPH REFERENCES ================= */

export type CodexForgeGraphRef = {
  nodeId: string;
  graphVersion?: number;
};

export type CodexForgeGraphAware = {
  id?: string;
  graph?: CodexForgeGraphRef;
};

/* ================= CORE PLAN ================= */

export type CodexForgePlan = CodexForgeGraphAware & {
  goal: string;
  steps: string[];

  risks?: string[];
  files?: string[];
  commands?: string[];

  nextAction?: string;

  status?: CodexForgePlanStatus;
  intent?: string;

  domain?: CodexForgePlanDomain;
  tags?: string[];
  notes?: string[];
};

/* ================= TOOLING ================= */

export type CodexForgeStructuredTool = {
  name: string;
  availability: CodexForgeStructuredToolAvailability;
  description: string;
};

export type CodexForgeStructuredSection = {
  title: string;
  items: string[];
};

/* ================= ENGINE OUTPUT ================= */

export type CodexForgeDiff = CodexForgeGraphAware & {
  filePath: string;
  patch: string;
};

export type CodexForgeSnapshotMeta = CodexForgeGraphAware & {
  fileCount: number;
  sampledPaths: string[];
};

export type CodexForgeStructuredExecution = CodexForgeGraphAware & {
  stepIndex?: number;
  stepText?: string;

  resultSummary?: string;
  phase?: CodexForgeExecutionPhase;

  diffCount?: number;
  snapshotFileCount?: number;

  logs?: string[];
};

export type CodexForgeStructuredReply = CodexForgeGraphAware & {
  mode?: CodexForgeStructuredReplyMode;

  title?: string;
  summary?: string;

  plan?: CodexForgePlan;

  goal?: string;
  nextSteps?: string[];

  context?: string[];
  understanding?: string[];

  files?: string[];
  commands?: string[];
  risks?: string[];
  status?: string[];

  tools?: CodexForgeStructuredTool[];
  sections?: CodexForgeStructuredSection[];

  execution?: CodexForgeStructuredExecution;

  diffs?: CodexForgeDiff[];
  snapshot?: CodexForgeSnapshotMeta;

  domain?: CodexForgePlanDomain;
  tags?: string[];
};

/* ================= CHAT MESSAGE ================= */

export type CodexForgeMessage = {
  id: string;
  role: CodexForgeRole;
  text: string;
  ts: number;

  structured?: CodexForgeStructuredReply | null;
  source?: CodexForgeMessageSource;
};

/* ================= MEMORY ================= */

export type CodexForgeMemoryItem = {
  id: string;
  type: CodexForgeMemoryType;
  content: string;

  importance: number;

  createdAt: number;
  updatedAt: number;

  pinned: boolean;
  sourceMessageId?: string;
};

export type CodexForgeContextMemoryItem = {
  id: string;
  type: CodexForgeMemoryType;
  content: string;

  pinned?: boolean;
  importance?: number;
};

/* ================= CONTEXT ================= */

export type CodexForgeContextExecution = {
  running?: boolean;
  stepIndex?: number | null;

  lastRunLabel?: string;
  lastCompletedAt?: number | null;

  enginePhase?: CodexForgeExecutionPhase;
  diffCount?: number;
  snapshotFileCount?: number;

  diffs?: CodexForgeDiff[];
};

export type CodexForgeContextExecutionRequest = {
  taskId: string;
  taskGoal: string;

  stepIndex: number;
  stepText: string;

  mode: CodexForgeExecutionRequestMode;
};

export type CodexForgeCapabilities = {
  domains?: CodexForgePlanDomain[];
  structuredReplies?: boolean;
  memory?: boolean;
  repoAwarePlanning?: boolean;
  localExecution?: boolean;
  diffPreviews?: boolean;
  snapshots?: boolean;
  approvals?: boolean;
  brainGraph?: boolean;
};

export type CodexForgeChatContext = {
  projectName?: string;

  workspaceRoot?: string;
  repoPath?: string;

  mode?: CodexForgeChatMode;
  systemGuide?: string;

  activePlan?: CodexForgePlan | null;

  memory?: CodexForgeContextMemoryItem[];

  execution?: CodexForgeContextExecution;
  executionRequest?: CodexForgeContextExecutionRequest;

  codexforgeCapabilities?: CodexForgeCapabilities;
};

/* ================= API REPLIES ================= */

export type CodexForgeAssistantReply = {
  id: string;
  role: "assistant";
  text: string;
  ts: number;

  structured?: CodexForgeStructuredReply;
};

export type CodexForgeChatSuccessMeta = {
  mode?: CodexForgeChatMode;

  usedFallback?: boolean;
  intent?: string;

  model?: string;
  projectName?: string;

  generatedPlan?: boolean;
  executionMode?: boolean;

  domain?: CodexForgePlanDomain;
};

export type CodexForgeChatSuccessResponse = {
  ok: true;
  reply: CodexForgeAssistantReply;
  meta?: CodexForgeChatSuccessMeta;
};

export type CodexForgeChatErrorResponse = {
  ok: false;
  error?: string;
};

export type CodexForgeChatResponse =
  | CodexForgeChatSuccessResponse
  | CodexForgeChatErrorResponse;

/* ================= OPTIONAL SHARED UI META ================= */

export type CodexForgeExecutionMeta = {
  hasExecution: boolean;
  stepIndex: number | null;
  stepNumber: number | null;
  stepText: string | null;
  resultSummary: string | null;
  phase: CodexForgeExecutionPhase | null;
  phaseLabel: string | null;
  diffCount: number | null;
  snapshotFileCount: number | null;
  logs: string[];
  logCount: number;
  hasCounts: boolean;
};

export type CodexForgeSnapshotMetaSummary = {
  hasSnapshot: boolean;
  fileCount: number | null;
  sampledPaths: string[];
  sampledPathCount: number;
};

export type CodexForgeDiffMetaSummary = {
  hasDiffs: boolean;
  count: number;
  filePaths: string[];
};

export type CodexForgeStructuredSummaryMeta = {
  modeLabel: string | null;
  statusLabel: string | null;
  domainLabel: string | null;

  hasPlan: boolean;
  isExecution: boolean;
  isFallback: boolean;

  hasExecutionMeta: boolean;
  hasSnapshotMeta: boolean;
  hasDiffMeta: boolean;

  stepCount: number;
  toolCount: number;
  sectionCount: number;
  contextCount: number;
  statusCount: number;
  tagCount: number;

  diffCount: number;
  snapshotFileCount: number | null;
  logCount: number;

  hasStructuredContent: boolean;
};