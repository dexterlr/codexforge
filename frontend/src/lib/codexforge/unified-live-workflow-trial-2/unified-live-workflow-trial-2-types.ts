export type UnifiedLiveWorkflowTrialTwoStatus = "ready-for-review" | "blocked";

export type UnifiedLiveWorkflowTrialTwoReview = {
  id: string;
  unifiedLiveWorkflowTrialTwoIdentity: string;
  trialStageGroups: string[];
  providerLocalConnectorAutomationHandoffPreview: string[];
  approvalGateChecklist: string[];
  evidenceChecklist: string[];
  deniedLiveTrialActions: string[];
  blockedTrialTwoRisks: string[];
  trialTwoResultReviewRoute: string;
  trialTwoFailureRecoveryRoute: string;
  nextRecommendedAction: string;
  status: UnifiedLiveWorkflowTrialTwoStatus;
  advancedTrialTwoDetails: string;
};

export type UnifiedLiveWorkflowTrialTwoBoundary = {
  unifiedLiveWorkflowTrialTwoReviewOnly: true;
  unifiedLiveWorkflowTrialTwoDoesNotExecuteWorkflows: true;
  trialTwoRequiresExplicitOperatorApproval: true;
  unapprovedLivePathsRemainBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  liveWorkflowLaunchAllowedFromUi: false;
  trialLaunchAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorDataFetchAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  recoveryAutoTriggerAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  outputStorageAllowed: false;
  feedbackAutoIngestionAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  mcpRuntimeCreated: false;
  credentialStorageAllowed: false;
  routeCoverageRemovalAllowed: false;
};

export type UnifiedLiveWorkflowTrialTwoModel = {
  title: "Unified live workflow trial 2";
  summary: string;
  reviews: UnifiedLiveWorkflowTrialTwoReview[];
  boundary: UnifiedLiveWorkflowTrialTwoBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildUnifiedLiveWorkflowTrialTwoStableKey(
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
