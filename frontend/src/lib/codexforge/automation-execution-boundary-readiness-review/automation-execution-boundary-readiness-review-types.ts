export type AutomationExecutionBoundaryReadinessReviewStatus = "ready-for-review" | "blocked";

export type AutomationExecutionBoundaryReadinessReview = {
  id: string;
  automationExecutionBoundaryIdentity: string;
  automationBoundaryGroups: string[];
  approvalGateChecklist: string[];
  scheduleWatchChecklist: string[];
  notificationChecklist: string[];
  stopRollbackChecklist: string[];
  deniedAutomationExecutionActions: string[];
  unresolvedAutomationBoundaryBlockers: string[];
  backendBoundaryInventoryRoute: string;
  dailyBetaOneReleaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: AutomationExecutionBoundaryReadinessReviewStatus;
  advancedAutomationExecutionBoundaryDetails: string;
};

export type AutomationExecutionBoundaryReadinessReviewBoundary = {
  reviewOnly: true; approvalRequired: true; automationExecutionAllowedFromUi: false; automationCreationAllowedFromUi: false; reminderCreationAllowedFromUi: false; taskSchedulingAllowedFromUi: false; scheduleCreationAllowedFromUi: false; conditionalWatchCreationAllowedFromUi: false; pollingLoopAllowedFromUi: false; backgroundJobCreationAllowedFromUi: false; notificationSendingAllowedFromUi: false; workflowExecutionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type AutomationExecutionBoundaryReadinessReviewModel = {
  title: "Automation execution boundary readiness review";
  summary: string;
  automationReviews: AutomationExecutionBoundaryReadinessReview[];
  boundary: AutomationExecutionBoundaryReadinessReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildAutomationExecutionBoundaryReadinessReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
