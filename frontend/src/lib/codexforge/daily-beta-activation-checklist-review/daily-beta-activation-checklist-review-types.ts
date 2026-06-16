export type DailyBetaActivationChecklistReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationChecklistReview = {
  id: string;
  activationChecklistIdentity: string;
  activationChecklistGroups: string[];
  liveBoundaryReadinessChecklist: string[];
  rolloutReadinessChecklist: string[];
  operatorReadinessChecklist: string[];
  evidenceResultRecoveryReadinessChecklist: string[];
  deniedActivationActions: string[];
  unresolvedActivationBlockers: string[];
  activationDryRunRoute: string;
  activationEvidenceReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationChecklistReviewStatus;
  advancedDailyBetaActivationChecklistReviewDetails: string;
};

export type DailyBetaActivationChecklistReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaActivationAllowedFromUi: false;
  activationSettingsPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaActivationChecklistReviewModel = {
  title: "Daily Beta activation checklist review";
  summary: string;
  checklists: DailyBetaActivationChecklistReview[];
  boundary: DailyBetaActivationChecklistReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationChecklistReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
