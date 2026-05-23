export type TrialReviewRoute =
  | "/start"
  | "/code-flow/trial"
  | "/code-flow/trial-review"
  | "/code-flow"
  | "/files"
  | "/apply-validation"
  | "/validation"
  | "/workflow-results"
  | "/run-history"
  | "/closed-loop";

export type TrialRunStatus =
  | "not-started"
  | "in-progress"
  | "passed"
  | "failed"
  | "blocked"
  | "abandoned"
  | "needs-ux-fix"
  | "unknown";

export type TrialObservationCategory =
  | "success"
  | "friction"
  | "wording"
  | "layout"
  | "navigation"
  | "safety"
  | "validation"
  | "apply"
  | "result-capture"
  | "unknown";

export type TrialSeverity = "low" | "medium" | "high" | "blocker" | "unknown";
export type TrialChecklistStatus = "pass" | "fail" | "partial" | "not-tested" | "blocked";
export type TrialScreenRating = "excellent" | "good" | "okay" | "confusing" | "broken" | "not-tested";
export type TrialFrictionType =
  | "too many panels"
  | "unclear primary action"
  | "wording too technical"
  | "missing next step"
  | "duplicate navigation"
  | "cramped layout"
  | "validation unclear"
  | "apply blocked without explanation"
  | "result capture unclear"
  | "route handoff confusing"
  | "safety warning too noisy"
  | "unknown";
export type TrialFixPriority = "now" | "soon" | "later" | "ignore" | "unknown";
export type TrialValidationStatus = "ready" | "passed" | "failed" | "unclear" | "not-tested" | "blocked";
export type TrialSafetyStatus = "pass" | "warning" | "blocker" | "unknown";
export type TrialUxFixCategory =
  | "copy"
  | "layout"
  | "navigation"
  | "empty-state"
  | "primary-action"
  | "validation"
  | "result-capture"
  | "safety-copy"
  | "flow-handoff"
  | "unknown";
export type TrialFixEffort = "small" | "medium" | "large" | "unknown";
export type TrialGoNoGoOutput = "go" | "go-with-fixes" | "no-go" | "blocked" | "unknown";

export type TrialRunRecord = {
  trialRunId: string;
  sourceTrialId: string;
  sourceRoute: TrialReviewRoute;
  selectedFileCategory: string;
  selectedFilePath?: string;
  changeRequestSummary: string;
  screensVisited: TrialReviewRoute[];
  validationCommandsReviewed: string[];
  validationResultStatus: TrialValidationStatus;
  operatorNotes: string;
  finalTrialStatus: TrialRunStatus;
  reviewRequired: boolean;
  noAutoApplyGuarantee: true;
  noAutoRunGuarantee: true;
  latestMessageAuthorityReminder: string;
};

export type TrialObservationItem = {
  observationId: string;
  category: TrialObservationCategory;
  label: string;
  note: string;
  severity: TrialSeverity;
  route: TrialReviewRoute;
  suggestedFix: string;
  reviewRequired: boolean;
};

export type TrialObservation = {
  observationId: string;
  title: string;
  items: TrialObservationItem[];
};

export type TrialPassFailChecklistItem = {
  itemId: string;
  label: string;
  status: TrialChecklistStatus;
  route: TrialReviewRoute;
  evidencePrompt: string;
  reviewRequired: boolean;
};

export type TrialPassFailChecklist = {
  checklistId: string;
  title: string;
  items: TrialPassFailChecklistItem[];
};

export type TrialScreenReviewItem = {
  itemId: string;
  route: TrialReviewRoute;
  screenLabel: string;
  visited: boolean;
  purposeUnderstood: boolean;
  primaryActionClear: boolean;
  layoutRating: TrialScreenRating;
  wordingRating: TrialScreenRating;
  frictionNotes: string;
  suggestedFix: string;
};

export type TrialScreenReview = {
  reviewId: string;
  title: string;
  items: TrialScreenReviewItem[];
};

export type TrialFrictionLogItem = {
  frictionId: string;
  type: TrialFrictionType;
  severity: TrialSeverity;
  route: TrialReviewRoute;
  userFacingSymptom: string;
  likelyCause: string;
  suggestedProductFix: string;
  priority: TrialFixPriority;
};

export type TrialFrictionLog = {
  logId: string;
  title: string;
  items: TrialFrictionLogItem[];
};

export type TrialValidationReviewItem = {
  itemId: string;
  label: string;
  status: TrialValidationStatus;
  note: string;
  reviewRequired: boolean;
};

export type TrialValidationReview = {
  reviewId: string;
  title: string;
  items: TrialValidationReviewItem[];
  overallStatus: TrialValidationStatus;
};

export type TrialSafetyReviewCheck = {
  checkId: string;
  label: string;
  status: TrialSafetyStatus;
  note: string;
};

export type TrialSafetyReview = {
  reviewId: string;
  title: string;
  checks: TrialSafetyReviewCheck[];
  overallStatus: TrialSafetyStatus;
};

export type TrialUxFixItem = {
  fixId: string;
  category: TrialUxFixCategory;
  title: string;
  route: TrialReviewRoute;
  problem: string;
  proposedFix: string;
  userBenefit: string;
  priority: TrialFixPriority;
  effort: TrialFixEffort;
  safetyImpact: string;
  suggestedNextPhase: string;
};

export type TrialUxFixPlan = {
  planId: string;
  title: string;
  items: TrialUxFixItem[];
};

export type TrialGoNoGoReason = {
  reasonId: string;
  label: string;
  passed: boolean;
  note: string;
};

export type TrialGoNoGoDecision = {
  decisionId: string;
  output: TrialGoNoGoOutput;
  reasons: TrialGoNoGoReason[];
  recommendation: string;
};

export type TrialReviewHandoffSection = {
  sectionId: string;
  title: string;
  body: string;
};

export type TrialReviewHandoff = {
  handoffId: string;
  title: string;
  sections: TrialReviewHandoffSection[];
  markdownTrialReview: string;
  productIssueDraft: string;
  uxFixPrompt: string;
  releaseReadinessNote: string;
};

export type TrialReviewSummary = {
  summaryId: string;
  trialStatus: TrialRunStatus;
  checklistPassCount: number;
  checklistFailCount: number;
  frictionCount: number;
  blockerCount: number;
  safetyStatus: TrialSafetyStatus;
  validationStatus: TrialValidationStatus;
  goNoGoDecision: TrialGoNoGoOutput;
  topNextFix: string;
};

export function buildTrialReviewStableKey(prefix: string, value: string): string {
  return `${prefix}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item"}`;
}
