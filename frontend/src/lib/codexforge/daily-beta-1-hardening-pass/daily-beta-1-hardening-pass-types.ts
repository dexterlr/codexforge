export type DailyBetaOneHardeningPassStatus = "ready-for-review" | "blocked";

export type DailyBetaOneHardeningPass = {
  id: string;
  dailyBetaOneHardeningIdentity: string;
  hardeningGroups: string[];
  feedbackTriageStatus: string[];
  regressionStatus: string[];
  rolloutStatus: string[];
  safetyReadinessChecklist: string[];
  deniedHardeningActions: string[];
  unresolvedHardeningBlockers: string[];
  documentationRefreshRoute: string;
  releaseNotesReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneHardeningPassStatus;
  advancedDailyBetaOneHardeningPassDetails: string;
};

export type DailyBetaOneHardeningPassBoundary = {
  reviewOnly: true; approvalRequired: true; actionExecutionAllowedFromUi: false; workflowExecutionAllowedFromUi: false; dailyBetaOneLaunchAllowedFromUi: false; rolloutExecutionAllowedFromUi: false; goLiveAllowedFromUi: false; approvalAutomationAllowedFromUi: false; approvalDecisionPersistenceAllowedFromUi: false; releaseSignoffAutomationAllowedFromUi: false; finalSafetySignoffAutomationAllowedFromUi: false; regressionTestExecutionAllowedFromUi: false; documentationPublishAllowedFromUi: false; releaseNotesPublishAllowedFromUi: false; handoffSendAllowedFromUi: false; feedbackIngestionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; localBridgeEndpointCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; fileMutationAllowedFromUi: false; memoryMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type DailyBetaOneHardeningPassModel = {
  title: "Daily Beta 1 hardening pass";
  summary: string;
  hardeningPasses: DailyBetaOneHardeningPass[];
  boundary: DailyBetaOneHardeningPassBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneHardeningPassStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
