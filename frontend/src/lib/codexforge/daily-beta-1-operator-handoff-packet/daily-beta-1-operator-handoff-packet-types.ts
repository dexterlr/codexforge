export type DailyBetaOneOperatorHandoffPacketStatus = "ready-for-review" | "blocked";

export type DailyBetaOneOperatorHandoffPacket = {
  id: string;
  dailyBetaOneHandoffIdentity: string;
  handoffGroups: string[];
  operatorRunbookSummary: string[];
  approvalBoundarySummary: string[];
  rolloutLimitationSummary: string[];
  validationChecklist: string[];
  deniedHandoffActions: string[];
  unresolvedHandoffBlockers: string[];
  finalSafetyReviewRoute: string;
  dailyBetaOneReleaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneOperatorHandoffPacketStatus;
  advancedDailyBetaOneOperatorHandoffPacketDetails: string;
};

export type DailyBetaOneOperatorHandoffPacketBoundary = {
  reviewOnly: true; approvalRequired: true; actionExecutionAllowedFromUi: false; workflowExecutionAllowedFromUi: false; dailyBetaOneLaunchAllowedFromUi: false; rolloutExecutionAllowedFromUi: false; goLiveAllowedFromUi: false; approvalAutomationAllowedFromUi: false; approvalDecisionPersistenceAllowedFromUi: false; releaseSignoffAutomationAllowedFromUi: false; finalSafetySignoffAutomationAllowedFromUi: false; regressionTestExecutionAllowedFromUi: false; documentationPublishAllowedFromUi: false; releaseNotesPublishAllowedFromUi: false; handoffSendAllowedFromUi: false; feedbackIngestionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; localBridgeEndpointCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; fileMutationAllowedFromUi: false; memoryMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type DailyBetaOneOperatorHandoffPacketModel = {
  title: "Daily Beta 1 operator handoff packet";
  summary: string;
  handoffPackets: DailyBetaOneOperatorHandoffPacket[];
  boundary: DailyBetaOneOperatorHandoffPacketBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneOperatorHandoffPacketStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
