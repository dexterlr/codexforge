export type RunHistoryKind =
  | "code-fix"
  | "validation"
  | "closed-loop"
  | "creative-plan"
  | "creative-review"
  | "local-setup"
  | "health-probe"
  | "workflow-wizard"
  | "unknown";

export type RunHistoryReviewStatus =
  | "needs-review"
  | "reviewed"
  | "blocked"
  | "ready-for-handoff"
  | "ready-for-memory-review"
  | "complete"
  | "unknown";

export type RunHistoryPersistenceMode =
  | "ui-session-only"
  | "copyable-handoff"
  | "reviewed-local-record"
  | "memory-candidate"
  | "export-only"
  | "disabled";

export type RunHistorySensitivity =
  | "public"
  | "project-context"
  | "source-code"
  | "validation-output"
  | "possible-secret"
  | "private-note"
  | "unknown";

export type RunHistoryValidationStatus = "passed" | "failed" | "warning" | "not-run" | "unknown";
export type RunHistoryHandoffReadiness = "ready" | "needs-review" | "blocked" | "not-needed";
export type RunHistoryMemoryCandidateReadiness = "ready-for-review" | "needs-review" | "blocked" | "not-candidate";

export type RunHistoryRoute =
  | "/run-history"
  | "/workflow-results"
  | "/code-flow"
  | "/apply-validation"
  | "/validation"
  | "/closed-loop"
  | "/files"
  | "/memory"
  | "/memory-inbox"
  | "/start";

export type RunHistoryRecordInput = {
  runKind?: RunHistoryKind;
  label?: string | null;
  sourceWorkflowResultId?: string | null;
  sourceRoute?: RunHistoryRoute | string | null;
  selectedFilePath?: string | null;
  changeSummary?: string | null;
  validationStatus?: RunHistoryValidationStatus;
  reviewStatus?: RunHistoryReviewStatus;
  handoffReadiness?: RunHistoryHandoffReadiness;
  memoryCandidateReadiness?: RunHistoryMemoryCandidateReadiness;
  currentNextAction?: string | null;
  privacySensitivity?: RunHistorySensitivity;
  persistenceMode?: RunHistoryPersistenceMode;
};

export type RunHistoryRecord = Required<Omit<RunHistoryRecordInput, "label" | "sourceWorkflowResultId" | "sourceRoute" | "selectedFilePath" | "changeSummary" | "currentNextAction">> & {
  runId: string;
  label: string;
  sourceWorkflowResultId: string;
  sourceRoute: string;
  selectedFilePath: string | null;
  changeSummary: string | null;
  currentNextAction: string;
  noAutoPromotionGuarantee: true;
  noBrainMutationGuarantee: true;
  noFilesystemWriteGuarantee: true;
  latestMessageAuthorityReminder: string;
};

export type RunHistoryRecordValidation = {
  ok: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type RunHistoryEventKind =
  | "started"
  | "file-selected"
  | "change-described"
  | "preview-created"
  | "apply-reviewed"
  | "validation-prepared"
  | "validation-output-reviewed"
  | "failure-routed"
  | "result-captured"
  | "handoff-created"
  | "memory-candidate-created"
  | "completed"
  | "blocked"
  | "unknown";

export type RunHistoryEventStatus = "done" | "needs-review" | "blocked" | "pending" | "unknown";

export type RunHistoryEvent = {
  eventId: string;
  runId: string;
  order: number;
  eventKind: RunHistoryEventKind;
  label: string;
  summary: string;
  route: string;
  status: RunHistoryEventStatus;
  reviewRequired: boolean;
  safetyNote: string;
  handoffNote: string;
};

export type RunHistoryGroupMode = "recent" | "status" | "workflow-kind" | "review-state" | "route" | "none";

export type RunHistoryTimelineSection = {
  sectionId: string;
  label: string;
  records: RunHistoryRecord[];
};

export type RunHistoryTimeline = {
  timelineId: string;
  records: RunHistoryRecord[];
  groupedSections: RunHistoryTimelineSection[];
  featuredRecord: RunHistoryRecord | null;
  totalCount: number;
  needsReviewCount: number;
  failedCount: number;
  completedCount: number;
  nextAction: string;
  sourceMode: "supplied-records" | "deterministic-sample" | "ui-session-only" | "copyable-only";
};

export type RunHistoryFilterId =
  | "all"
  | "needs-review"
  | "failed"
  | "passed"
  | "blocked"
  | "code-fix"
  | "validation"
  | "closed-loop"
  | "creative"
  | "local-setup"
  | "memory-candidate"
  | "handoff-ready";

export type RunHistoryFilter = {
  filterId: RunHistoryFilterId;
  label: string;
  description: string;
  count: number;
  selected: boolean;
};

export type RunHistoryReviewCheckStatus = "pass" | "warning" | "blocker" | "unknown";

export type RunHistoryReviewCheck = {
  checkId: string;
  label: string;
  status: RunHistoryReviewCheckStatus;
  detail: string;
};

export type RunHistoryReview = {
  reviewId: string;
  sourceRunId: string;
  checks: RunHistoryReviewCheck[];
  blockerCount: number;
  warningCount: number;
  reviewStatus: RunHistoryReviewCheckStatus;
  reviewRequired: true;
};

export type RunHistoryHandoffSectionKind =
  | "run summary"
  | "workflow status"
  | "file/change summary"
  | "validation result"
  | "failure route"
  | "next action"
  | "commit guidance"
  | "memory candidate"
  | "review notes";

export type RunHistoryHandoffSection = {
  sectionId: string;
  title: RunHistoryHandoffSectionKind;
  body: string;
  reviewedStatusVisible: boolean;
  sensitivity: RunHistorySensitivity;
};

export type RunHistoryHandoff = {
  handoffId: string;
  sourceRunId: string;
  sections: RunHistoryHandoffSection[];
  compactHandoff: string;
  markdownHandoff: string;
  issueOrPrDraft: string;
  closedLoopInput: string;
  memoryReviewCandidate: string;
  reviewedStatusVisible: boolean;
};

export type RunHistoryNextAction = {
  actionId: string;
  label: string;
  route: RunHistoryRoute;
  reason: string;
  copyPayload: string;
  requiresReview: boolean;
  noMutation: true;
};

export type RunHistoryNextActionPlan = {
  planId: string;
  selected: RunHistoryNextAction;
  actions: RunHistoryNextAction[];
  smallestUnblockStep: string;
};

export type RunHistoryMemoryCategory =
  | "coding-pattern"
  | "validation-failure"
  | "project-convention"
  | "workflow-preference"
  | "handoff-pattern"
  | "blocked-issue"
  | "unknown";

export type RunHistoryMemoryCandidate = {
  candidateId: string;
  sourceRunId: string;
  title: string;
  summary: string;
  reusableLesson: string;
  projectContext: string;
  excludedSensitiveDetails: string[];
  promotionReadiness: "ready-for-review" | "needs-review" | "blocked";
  reviewRequired: true;
  suggestedMemoryCategory: RunHistoryMemoryCategory;
  noAutoPromotionGuarantee: true;
  noSecrets: true;
  noHugeLogs: true;
};

export type RunHistoryExportFormat =
  | "markdown"
  | "plain-text"
  | "json-preview"
  | "issue-draft"
  | "pr-summary-draft"
  | "handoff-note";

export type RunHistoryExportSection = {
  sectionId: string;
  title: string;
  body: string;
};

export type RunHistoryExport = {
  exportId: string;
  format: RunHistoryExportFormat;
  title: string;
  sections: RunHistoryExportSection[];
  payload: string;
  copyLabel: string;
  redactionNotes: string[];
};

export type RunHistorySummary = {
  recordCount: number;
  needsReviewCount: number;
  completedCount: number;
  failedCount: number;
  handoffReadyCount: number;
  memoryCandidateCount: number;
  selectedFilter: RunHistoryFilterId;
  nextSafeAction: string;
};

export function buildRunHistoryStableKey(...parts: readonly (string | number | null | undefined)[]): string {
  const source = parts.map((part) => String(part ?? "none").trim().toLowerCase()).join("|");
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) % 1000000007;
  }
  return `${source.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72) || "run-history"}-${hash.toString(36)}`;
}

export function capRunHistoryText(value?: string | null, limit = 900): { text: string; truncated: boolean } {
  const text = String(value ?? "").trim();
  if (text.length <= limit) return { text, truncated: false };
  return { text: `${text.slice(0, Math.max(0, limit - 16))}\n...[truncated]`, truncated: true };
}
