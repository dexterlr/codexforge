export type UnifiedLiveWorkflowTrialTwoResultReviewStatus = "ready-for-review" | "blocked";

export type UnifiedLiveWorkflowTrialTwoResultReview = {
  id: string;
  trialTwoResultReviewIdentity: string;
  resultReviewGroups: string[];
  acceptanceRejectionChecklist: string[];
  evidenceQualityChecklist: string[];
  privacyRedactionChecklist: string[];
  deniedResultActions: string[];
  blockedResultRisks: string[];
  failureRecoveryRoute: string;
  hardeningPassRoute: string;
  nextRecommendedAction: string;
  status: UnifiedLiveWorkflowTrialTwoResultReviewStatus;
  advancedResultReviewDetails: string;
};

export type UnifiedLiveWorkflowTrialTwoResultReviewBoundary = {
  trialTwoResultReviewOnly: true;
  trialTwoResultReviewDoesNotStoreLiveOutputs: true;
  trialTwoResultsRequireOperatorReviewBeforeUse: true;
  unsafeTrialResultsRemainBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  liveWorkflowLaunchAllowedFromUi: false;
  outputStorageAllowed: false;
  resultAutoIngestionAllowedFromUi: false;
  evidenceAutoIngestionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  credentialStorageAllowed: false;
};

export type UnifiedLiveWorkflowTrialTwoResultReviewModel = {
  title: "Unified live workflow trial 2 result review";
  summary: string;
  reviews: UnifiedLiveWorkflowTrialTwoResultReview[];
  boundary: UnifiedLiveWorkflowTrialTwoResultReviewBoundary;
  resultLanguage: string[];
  advancedDetails: string[];
};

export function buildUnifiedLiveWorkflowTrialTwoResultReviewStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
