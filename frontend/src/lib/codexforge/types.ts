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
  | "automation"
  | "trading"
  | "blender"
  | "design"
  | "marketing"
  | "decks";

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

/* ================= APPROVAL / DIFF PREVIEW CONTRACT ================= */

export type CodexForgeApprovalState =
  | "not-required"
  | "pending"
  | "approved"
  | "rejected"
  | "expired"
  | "applied"
  | "failed";

export type CodexForgeApprovalKind =
  | "plan"
  | "diff"
  | "command"
  | "file-write"
  | "install"
  | "deploy"
  | "render"
  | "desktop"
  | "external-action"
  | "other";

export type CodexForgeApprovalDecision = {
  state: CodexForgeApprovalState;
  decidedAt?: number;
  decidedBy?: "user" | "system";
  reason?: string;
};

export type CodexForgeApprovalGate = CodexForgeGraphAware & {
  kind: CodexForgeApprovalKind;
  state: CodexForgeApprovalState;

  label: string;
  reason?: string;

  createdAt: number;
  updatedAt: number;
  expiresAt?: number;

  requiresExplicitUserAction: boolean;
  decision?: CodexForgeApprovalDecision;
};

export type CodexForgeDiffPreviewStatus =
  | "draft"
  | "ready"
  | "awaiting-approval"
  | "approved"
  | "rejected"
  | "stale"
  | "applying"
  | "applied"
  | "failed";

export type CodexForgeDiffPreviewSource =
  | "chat"
  | "operator"
  | "tool"
  | "local-engine"
  | "manual";

export type CodexForgeDiffPreviewValidation = {
  command?: string;
  status?: "not-run" | "running" | "passed" | "failed" | "skipped";
  output?: string;
  completedAt?: number;
};

export type CodexForgeDiffPreviewApplyResult = {
  ok: boolean;
  appliedAt: number;
  filePath: string;
  backupPath?: string;
  summary?: string;
  error?: string;
};

export type CodexForgeDiffPreview = CodexForgeGraphAware & {
  previewId: string;

  source: CodexForgeDiffPreviewSource;
  status: CodexForgeDiffPreviewStatus;

  filePath: string;
  patch: string;

  title?: string;
  summary?: string;
  rationale?: string;

  createdAt: number;
  updatedAt: number;

  baseHash?: string;
  patchHash?: string;
  staleReason?: string;

  dryRun: boolean;
  approvalRequired: boolean;
  approval?: CodexForgeApprovalGate;

  validation?: CodexForgeDiffPreviewValidation;
  applyResult?: CodexForgeDiffPreviewApplyResult;

  relatedMessageId?: string;
  relatedPlanId?: string;
  relatedToolName?: string;

  metadata?: Record<string, unknown>;
};

export type CodexForgeDiffPreviewBatch = CodexForgeGraphAware & {
  batchId: string;
  status: CodexForgeDiffPreviewStatus;

  title?: string;
  summary?: string;

  previews: CodexForgeDiffPreview[];

  createdAt: number;
  updatedAt: number;

  approvalRequired: boolean;
  approval?: CodexForgeApprovalGate;

  metadata?: Record<string, unknown>;
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

  approvals?: CodexForgeApprovalGate[];
  diffPreviews?: CodexForgeDiffPreview[];
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

  previewId?: string;
  approvalState?: CodexForgeApprovalState;
  dryRun?: boolean;
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

  approvalCount?: number;
  pendingApprovalCount?: number;
  diffPreviewCount?: number;

  logs?: string[];
};

export type CodexForgeAgentTeamToolSummary = {
  name: string;
  permission: "read-only" | "approval-required" | "blocked-by-default";
  reason?: string;
};

export type CodexForgeAgentTeamSummary = {
  domain: CodexForgePlanDomain;
  primaryRole: {
    id: string;
    label: string;
    mission: string;
  };
  supportRoles: Array<{
    id: string;
    label: string;
  }>;
  reviewRoles: Array<{
    id: string;
    label: string;
  }>;
  allowedTools: CodexForgeAgentTeamToolSummary[];
  approvalRequiredTools: CodexForgeAgentTeamToolSummary[];
  blockedTools: CodexForgeAgentTeamToolSummary[];
  reasons: string[];
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
  diffPreviews?: CodexForgeDiffPreview[];
  diffPreviewBatch?: CodexForgeDiffPreviewBatch;

  approvals?: CodexForgeApprovalGate[];

  snapshot?: CodexForgeSnapshotMeta;

  domain?: CodexForgePlanDomain;
  tags?: string[];

  agentTeam?: CodexForgeAgentTeamSummary;
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

  approvalCount?: number;
  pendingApprovalCount?: number;
  diffPreviewCount?: number;

  diffs?: CodexForgeDiff[];
  diffPreviews?: CodexForgeDiffPreview[];
  approvals?: CodexForgeApprovalGate[];
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

  dryRunDiffs?: boolean;
  applyDiffs?: boolean;
  commandExecution?: boolean;
  checkpointing?: boolean;
};

export type CodexForgeChatContext = {
  projectName?: string;

  workspaceRoot?: string;
  repoPath?: string;

  mode?: CodexForgeChatMode;
  systemGuide?: string;

  agentTeam?: CodexForgeAgentTeamSummary;

  activePlan?: CodexForgePlan | null;

  memory?: CodexForgeContextMemoryItem[];

  execution?: CodexForgeContextExecution;
  executionRequest?: CodexForgeContextExecutionRequest;

  pendingApprovals?: CodexForgeApprovalGate[];
  pendingDiffPreviews?: CodexForgeDiffPreview[];

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

  approvalRequired?: boolean;
  pendingApprovalCount?: number;
  diffPreviewCount?: number;
  provider?: string;
  durationMs?: number;
  warnings?: string[];
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

  approvalCount?: number | null;
  pendingApprovalCount?: number | null;
  diffPreviewCount?: number | null;
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

  hasPreviews?: boolean;
  previewCount?: number;
  pendingApprovalCount?: number;
};

export type CodexForgeApprovalMetaSummary = {
  hasApprovals: boolean;
  count: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  failedCount: number;
  labels: string[];
};

export type CodexForgeDiffPreviewMetaSummary = {
  hasDiffPreviews: boolean;
  count: number;
  pendingCount: number;
  approvedCount: number;
  appliedCount: number;
  staleCount: number;
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
  hasApprovalMeta?: boolean;
  hasDiffPreviewMeta?: boolean;

  stepCount: number;
  toolCount: number;
  sectionCount: number;
  contextCount: number;
  statusCount: number;
  tagCount: number;

  diffCount: number;
  snapshotFileCount: number | null;
  logCount: number;

  approvalCount?: number;
  pendingApprovalCount?: number;
  diffPreviewCount?: number;

  hasStructuredContent: boolean;
};





