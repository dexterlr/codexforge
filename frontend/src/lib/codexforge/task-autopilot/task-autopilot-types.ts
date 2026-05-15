import type { BrainRecallResults } from "@/lib/codexforge/brain-recall";
import type { ChatRecallPreparedContext } from "@/lib/codexforge/chat-recall";
import type { CodexForgePatchPreviewPlan } from "@/lib/codexforge/patch-preview";
import type { MemoryReviewQueue } from "@/lib/codexforge/memory-review";
import type { MissionControlSummary } from "@/lib/codexforge/mission-control";
import type { CodexForgeFileNode, CodexForgeFilesApiResponse } from "@/lib/codexforge/files";

export type TaskSignalSourceType =
  | "brain-recall"
  | "chat-recall"
  | "memory-candidate"
  | "files-intelligence"
  | "patch-preview"
  | "mission-control"
  | "artifact-hint";

export type TaskRiskLevel = "low" | "medium" | "high" | "critical";
export type TaskReviewState =
  | "suggested"
  | "needs-review"
  | "accepted-for-planning"
  | "rejected"
  | "deferred"
  | "blocked"
  | "handoff-ready";

export type TaskReviewActionType =
  | "accept"
  | "reject"
  | "defer"
  | "block"
  | "preview-plan"
  | "copy-handoff";

export type TaskSuggestionKind =
  | "inspect"
  | "fix"
  | "harden"
  | "test"
  | "document"
  | "refactor"
  | "promote-memory"
  | "review-artifact"
  | "plan-creative"
  | "prepare-patch";

export type TaskSafeNextAction =
  | "review-required"
  | "preview-plan"
  | "open-safe-patch-preview"
  | "open-memory-review"
  | "open-brain-merge-review"
  | "copy-handoff"
  | "blocked";

export type TaskSignal = {
  id: string;
  sourceType: TaskSignalSourceType;
  sourceId: string;
  title: string;
  summary: string;
  tags: string[];
  filePaths: string[];
  relatedMemoryIds: string[];
  relatedArtifactIds: string[];
  relatedRunIds: string[];
  riskHints: string[];
  urgencyHints: string[];
  confidence: number;
};

export type TaskSignalInput = {
  sourceType: TaskSignalSourceType;
  sourceId: string;
  title: string;
  summary: string;
  tags?: string[];
  filePaths?: string[];
  relatedMemoryIds?: string[];
  relatedArtifactIds?: string[];
  relatedRunIds?: string[];
  riskHints?: string[];
  urgencyHints?: string[];
  confidence?: number;
};

export type TaskSignalExtractorInput = {
  brainRecall?: BrainRecallResults | null;
  chatRecall?: ChatRecallPreparedContext | null;
  memoryQueue?: MemoryReviewQueue | null;
  filesContext?: CodexForgeFilesApiResponse | null;
  selectedFile?: CodexForgeFileNode | null;
  patchPreview?: CodexForgePatchPreviewPlan | null;
  missionControl?: MissionControlSummary | null;
  artifactHints?: TaskSignalInput[];
};

export type TaskSignalSummary = {
  id: "task-signal-summary";
  signalCount: number;
  sourceTypes: Array<{ sourceType: TaskSignalSourceType; count: number }>;
  highRiskCount: number;
  filePathCount: number;
  summary: string[];
};

export type TaskSuggestion = {
  id: string;
  kind: TaskSuggestionKind;
  title: string;
  goal: string;
  whyNow: string;
  sourceSignalIds: string[];
  sourceSignals: TaskSignal[];
  impactedFiles: string[];
  expectedArtifacts: string[];
  suggestedFirstStep: string;
  acceptanceChecks: string[];
  riskLevel: TaskRiskLevel;
  confidence: number;
  reviewState: TaskReviewState;
  safeNextAction: TaskSafeNextAction;
};

export type TaskSuggestionInput = {
  kind: TaskSuggestionKind;
  title: string;
  goal: string;
  whyNow: string;
  sourceSignals: TaskSignal[];
  impactedFiles?: string[];
  expectedArtifacts?: string[];
  suggestedFirstStep?: string;
  acceptanceChecks?: string[];
  riskLevel?: TaskRiskLevel;
  confidence?: number;
  reviewState?: TaskReviewState;
  safeNextAction?: TaskSafeNextAction;
};

export type TaskSuggestionSummary = {
  id: "task-suggestion-summary";
  suggestionCount: number;
  reviewRequiredCount: number;
  blockedCount: number;
  kindBreakdown: Array<{ kind: TaskSuggestionKind; count: number }>;
  summary: string[];
};

export type TaskPriorityExplanation = {
  id: string;
  suggestionId: string;
  score: number;
  reasons: string[];
};

export type RankedTaskSuggestion = TaskSuggestion & {
  priorityScore: number;
  priorityReasons: string[];
};

export type TaskAutopilotRiskPolicy = {
  id: "task-autopilot-risk-policy";
  autoRunAllowed: false;
  autoFileWriteAllowed: false;
  directGraphMutationAllowed: false;
  allTasksRequireReview: true;
  rules: Array<{
    id: string;
    label: string;
    state: "allow-preview" | "route-review" | "block";
    detail: string;
  }>;
  blockedCapabilities: string[];
  summary: string[];
};

export type TaskPolicyDecision = {
  allowed: boolean;
  safeNextAction: TaskSafeNextAction;
  reason: string;
};

export type TaskPlanStep = {
  id: string;
  label: string;
  detail: string;
  gate: "review" | "inspect" | "preview" | "approval" | "handoff";
};

export type TaskPlanPreview = {
  id: string;
  suggestionId: string;
  goal: string;
  taskKind: TaskSuggestionKind;
  orderedSteps: TaskPlanStep[];
  filesToInspect: string[];
  memoriesToVerify: string[];
  testsToRun: string[];
  approvalGates: string[];
  rollbackNotes: string[];
  handoffPrompt: string;
  noMutationGuarantee: string;
  summary: string[];
};

export type TaskReviewItem = {
  id: string;
  suggestion: TaskSuggestion;
  reviewState: TaskReviewState;
  selected: boolean;
  planPreview: TaskPlanPreview | null;
  handoffPrompt: string;
  summary: string[];
};

export type TaskReviewQueue = {
  id: "task-review-queue";
  items: TaskReviewItem[];
  summary: string[];
};

export type TaskReviewAction = {
  id: string;
  type: TaskReviewActionType;
  itemId: string;
  note: string;
};

export type TaskHandoff = {
  id: string;
  suggestionId: string;
  prompt: string;
  safetyNotes: string[];
  summary: string[];
};

export type TaskAutopilotBundle = {
  signals: TaskSignal[];
  signalSummary: TaskSignalSummary;
  suggestions: RankedTaskSuggestion[];
  suggestionSummary: TaskSuggestionSummary;
  policy: TaskAutopilotRiskPolicy;
  queue: TaskReviewQueue;
  activePreview: TaskPlanPreview | null;
  handoff: TaskHandoff | null;
  summary: string[];
};

export function buildTaskAutopilotStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function clampTaskConfidence(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(Math.max(value, 0), 1)
    : 0.5;
}
