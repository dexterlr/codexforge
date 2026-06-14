export type DailyBetaOneDocumentationRefreshStatus = "ready-for-review" | "blocked";

export type DailyBetaOneDocumentationRefresh = {
  id: string;
  dailyBetaOneDocumentationRefreshIdentity: string;
  documentationGroups: string[];
  operatorRunbookChecklist: string[];
  checkpointDocsChecklist: string[];
  releaseNotesHandoffChecklist: string[];
  safetyWordingChecklist: string[];
  deniedDocumentationShortcuts: string[];
  unresolvedDocumentationBlockers: string[];
  releaseNotesReviewRoute: string;
  operatorHandoffPacketRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneDocumentationRefreshStatus;
  advancedDailyBetaOneDocumentationRefreshDetails: string;
};

export type DailyBetaOneDocumentationRefreshBoundary = {
  reviewOnly: true; approvalRequired: true; actionExecutionAllowedFromUi: false; workflowExecutionAllowedFromUi: false; dailyBetaOneLaunchAllowedFromUi: false; rolloutExecutionAllowedFromUi: false; goLiveAllowedFromUi: false; approvalAutomationAllowedFromUi: false; approvalDecisionPersistenceAllowedFromUi: false; releaseSignoffAutomationAllowedFromUi: false; finalSafetySignoffAutomationAllowedFromUi: false; regressionTestExecutionAllowedFromUi: false; documentationPublishAllowedFromUi: false; releaseNotesPublishAllowedFromUi: false; handoffSendAllowedFromUi: false; feedbackIngestionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; localBridgeEndpointCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; fileMutationAllowedFromUi: false; memoryMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type DailyBetaOneDocumentationRefreshModel = {
  title: "Daily Beta 1 documentation refresh";
  summary: string;
  documentationReviews: DailyBetaOneDocumentationRefresh[];
  boundary: DailyBetaOneDocumentationRefreshBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneDocumentationRefreshStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
