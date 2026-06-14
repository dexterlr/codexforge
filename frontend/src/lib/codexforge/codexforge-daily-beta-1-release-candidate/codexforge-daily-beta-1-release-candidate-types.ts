export type CodexForgeDailyBetaOneReleaseCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeDailyBetaOneReleaseCandidate = {
  id: string;
  dailyBetaOneReleaseCandidateIdentity: string;
  feedbackTriageStatus: string[];
  regressionStatus: string[];
  hardeningStatus: string[];
  documentationReleaseNotesHandoffStatus: string[];
  finalSafetyStatus: string[];
  deniedReleaseCandidateActions: string[];
  unresolvedReleaseCandidateBlockers: string[];
  nextRolloutMilestoneRoute: string;
  checkpointDocsRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeDailyBetaOneReleaseCandidateStatus;
  advancedDailyBetaOneReleaseCandidateDetails: string;
};

export type CodexForgeDailyBetaOneReleaseCandidateBoundary = {
  reviewOnly: true; approvalRequired: true; actionExecutionAllowedFromUi: false; workflowExecutionAllowedFromUi: false; dailyBetaOneLaunchAllowedFromUi: false; rolloutExecutionAllowedFromUi: false; goLiveAllowedFromUi: false; approvalAutomationAllowedFromUi: false; approvalDecisionPersistenceAllowedFromUi: false; releaseSignoffAutomationAllowedFromUi: false; finalSafetySignoffAutomationAllowedFromUi: false; regressionTestExecutionAllowedFromUi: false; documentationPublishAllowedFromUi: false; releaseNotesPublishAllowedFromUi: false; handoffSendAllowedFromUi: false; feedbackIngestionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; localBridgeEndpointCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; fileMutationAllowedFromUi: false; memoryMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type CodexForgeDailyBetaOneReleaseCandidateModel = {
  title: "CodexForge Daily Beta 1 release candidate";
  summary: string;
  releaseCandidates: CodexForgeDailyBetaOneReleaseCandidate[];
  boundary: CodexForgeDailyBetaOneReleaseCandidateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildCodexForgeDailyBetaOneReleaseCandidateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
