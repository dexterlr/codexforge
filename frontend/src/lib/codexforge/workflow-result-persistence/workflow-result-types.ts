export type WorkflowResultKind =
  | "code-fix"
  | "validation"
  | "closed-loop"
  | "creative-plan"
  | "artifact-review"
  | "local-setup"
  | "unknown";

export type WorkflowResultFinalStatus =
  | "not-started"
  | "preview-ready"
  | "apply-request-ready"
  | "applied-needs-validation"
  | "validation-passed"
  | "validation-failed"
  | "blocked"
  | "abandoned"
  | "complete"
  | "unknown";

export type WorkflowResultPersistenceMode =
  | "ui-session-only"
  | "copyable-handoff"
  | "reviewed-local-record"
  | "memory-candidate"
  | "export-only"
  | "disabled";

export type WorkflowResultSensitivity =
  | "public"
  | "project-context"
  | "source-code"
  | "validation-output"
  | "possible-secret"
  | "private-note"
  | "unknown";

export type WorkflowResultCaptureItemType =
  | "selected-file"
  | "requested-change"
  | "preview-diff-summary"
  | "apply-approval-summary"
  | "rollback-summary"
  | "validation-command-list"
  | "validation-output-summary"
  | "pass-fail-result"
  | "closed-loop-route"
  | "next-action"
  | "operator-notes";

export type ValidationCommandStatus = "pass" | "fail" | "warning" | "unknown" | "not-run" | "manual-only";
export type WorkflowResultReviewCheckStatus = "pass" | "warning" | "blocker" | "unknown";
export type WorkflowResultMemoryCategory =
  | "coding-pattern"
  | "validation-failure"
  | "project-convention"
  | "workflow-preference"
  | "user-preference"
  | "blocked-issue"
  | "unknown";
export type WorkflowResultExportFormat =
  | "markdown"
  | "plain-text"
  | "json-preview"
  | "issue-draft"
  | "pr-summary-draft"
  | "handoff-note";

export type WorkflowResultRoute =
  | "/workflow-results"
  | "/code-flow"
  | "/apply-validation"
  | "/validation"
  | "/closed-loop"
  | "/files"
  | "/memory"
  | "/memory-inbox"
  | "/start";

export type WorkflowResultRecordInput = {
  workflowKind?: WorkflowResultKind;
  sourceFlowId?: string | null;
  sourceRoute?: WorkflowResultRoute | string | null;
  selectedFilePath?: string | null;
  changeRequestSummary?: string | null;
  previewSummary?: string | null;
  applySummary?: string | null;
  validationSummary?: string | null;
  finalStatus?: WorkflowResultFinalStatus;
  resultLabel?: string | null;
  operatorNote?: string | null;
  reviewRequired?: boolean;
  persistenceMode?: WorkflowResultPersistenceMode;
};

export type WorkflowResultRecord = Required<Omit<WorkflowResultRecordInput, "sourceRoute" | "selectedFilePath" | "changeRequestSummary" | "previewSummary" | "applySummary" | "validationSummary" | "resultLabel" | "operatorNote">> & {
  resultId: string;
  sourceRoute: string;
  selectedFilePath: string | null;
  changeRequestSummary: string | null;
  previewSummary: string | null;
  applySummary: string | null;
  validationSummary: string | null;
  resultLabel: string;
  operatorNote: string | null;
  noAutoPromotionGuarantee: true;
  latestMessageAuthorityReminder: string;
  noBrainMutationGuarantee: true;
  noFilesystemWriteGuarantee: true;
};

export type WorkflowResultRecordValidation = {
  ok: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type WorkflowResultCaptureItem = {
  itemId: string;
  label: string;
  type: WorkflowResultCaptureItemType;
  valueSummary: string;
  sensitivity: WorkflowResultSensitivity;
  reviewRequired: boolean;
  includeInHandoff: boolean;
  includeInMemoryCandidate: boolean;
};

export type WorkflowResultCapture = {
  captureId: string;
  sourceResultId: string;
  items: WorkflowResultCaptureItem[];
  summary: string[];
};

export type WorkflowResultStoragePolicy = {
  policyId: string;
  displayAllowed: boolean;
  handoffAllowed: boolean;
  memoryCandidateAllowed: boolean;
  exportAllowed: boolean;
  autoPersistAllowed: false;
  brainAutoMutationBlocked: true;
  memoryAutoPromotionBlocked: true;
  rawSecretsBlocked: true;
  hugeRawOutputBlocked: true;
  sourceCodeSnippetsRequireReview: true;
  validationOutputRequiresReview: true;
  operatorMustApprovePromotion: true;
  latestMessageAuthorityPreserved: true;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
};

export type ValidationCommandResult = {
  commandId: string;
  command: string;
  exitCode: number | null;
  status: ValidationCommandStatus;
  stdoutExcerpt: string;
  stderrExcerpt: string;
  detectedErrors: string[];
  detectedWarnings: string[];
  truncated: boolean;
  reviewNote: string;
};

export type ValidationResultRecord = {
  validationResultId: string;
  sourceValidationRequestId: string;
  commands: ValidationCommandResult[];
  overallStatus: ValidationCommandStatus;
  passCount: number;
  failCount: number;
  unknownCount: number;
  outputReviewSummary: string;
  failureSummary: string;
  recommendedRoute: WorkflowResultRoute;
  nextAction: string;
  doesNotFabricateOutput: true;
  capsExcerpts: true;
};

export type WorkflowResultHandoffSectionKind =
  | "what changed"
  | "what was previewed"
  | "apply status"
  | "validation status"
  | "rollback note"
  | "failures"
  | "next action"
  | "commit guidance"
  | "review notes";

export type WorkflowResultHandoffSection = {
  sectionId: string;
  title: WorkflowResultHandoffSectionKind;
  body: string;
  reviewedByOperator: boolean;
  sensitivity: WorkflowResultSensitivity;
};

export type WorkflowResultHandoff = {
  handoffId: string;
  sourceResultId: string;
  sections: WorkflowResultHandoffSection[];
  plainTextHandoff: string;
  compactMarkdownHandoff: string;
  issueOrPrSummaryDraft: string;
  closedLoopInputSummary: string;
  memoryReviewCandidateSummary: string;
  reviewedByOperator: boolean;
};

export type WorkflowResultReviewCheck = {
  checkId: string;
  label: string;
  status: WorkflowResultReviewCheckStatus;
  detail: string;
};

export type WorkflowResultReview = {
  reviewId: string;
  sourceResultId: string;
  checks: WorkflowResultReviewCheck[];
  blockerCount: number;
  warningCount: number;
  reviewStatus: WorkflowResultReviewCheckStatus;
  reviewRequired: true;
};

export type WorkflowResultNextAction = {
  actionId: string;
  label: string;
  route: WorkflowResultRoute;
  reason: string;
  copyPayload: string;
  requiresReview: boolean;
  noMutation: true;
};

export type WorkflowResultNextActionPlan = {
  planId: string;
  selected: WorkflowResultNextAction;
  actions: WorkflowResultNextAction[];
  smallestUnblockStep: string;
};

export type WorkflowResultMemoryCandidate = {
  candidateId: string;
  sourceResultId: string;
  title: string;
  summary: string;
  reusableLesson: string;
  projectContext: string;
  excludedSensitiveDetails: string[];
  promotionReadiness: "ready-for-review" | "needs-review" | "blocked";
  reviewRequired: true;
  suggestedMemoryCategory: WorkflowResultMemoryCategory;
  noAutoPromotionGuarantee: true;
  noSecrets: true;
  noHugeLogs: true;
};

export type WorkflowResultExportSection = {
  sectionId: string;
  title: string;
  body: string;
};

export type WorkflowResultExport = {
  exportId: string;
  format: WorkflowResultExportFormat;
  title: string;
  sections: WorkflowResultExportSection[];
  redactionNotes: string[];
  reviewStatus: "review-required" | "reviewed" | "blocked";
  copyLabel: string;
  payload: string;
};

export type WorkflowResultSummary = {
  resultStatus: WorkflowResultFinalStatus;
  captureItemCount: number;
  validationStatus: ValidationCommandStatus;
  reviewStatus: WorkflowResultReviewCheckStatus;
  storagePolicyStatus: string;
  handoffReadiness: string;
  memoryCandidateReadiness: string;
  exportReadiness: string;
  nextSafeAction: string;
};

export function buildWorkflowResultStableKey(...parts: readonly (string | number | null | undefined)[]): string {
  const source = parts.map((part) => String(part ?? "none").trim().toLowerCase()).join("|");
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) % 1000000007;
  }
  return `${source.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72) || "workflow-result"}-${hash.toString(36)}`;
}

export function capWorkflowResultText(value?: string | null, limit = 900): { text: string; truncated: boolean } {
  const text = String(value ?? "").trim();
  if (text.length <= limit) return { text, truncated: false };
  return { text: `${text.slice(0, Math.max(0, limit - 16))}\n...[truncated]`, truncated: true };
}
