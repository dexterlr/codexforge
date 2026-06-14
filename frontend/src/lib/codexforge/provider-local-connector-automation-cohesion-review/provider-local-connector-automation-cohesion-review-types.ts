export type ProviderLocalConnectorAutomationCohesionReviewStatus = "ready-for-review" | "blocked";

export type ProviderLocalConnectorAutomationCohesionReview = {
  id: string;
  crossLaneCohesionIdentity: string;
  providerLaneStatus: string[];
  localModelLaneStatus: string[];
  connectorLaneStatus: string[];
  automationLaneStatus: string[];
  sharedApprovalEvidenceResultRecoveryHandoffMatrix: string[];
  deniedCohesionActions: string[];
  unresolvedCohesionBlockers: string[];
  unifiedApprovalPolicyRoute: string;
  unifiedEvidencePolicyRoute: string;
  nextRecommendedAction: string;
  status: ProviderLocalConnectorAutomationCohesionReviewStatus;
  advancedCohesionDetails: string;
};

export type ProviderLocalConnectorAutomationCohesionReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  cohesionReviewDoesNotRouteLiveTraffic: true;
  crossLaneActionsRequireExplicitOperatorApproval: true;
  unresolvedCohesionBlockersStayBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  liveTrafficRoutingAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorDataFetchAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  policyAutoApplyAllowedFromUi: false;
  settingsPersistenceAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  resultIngestionAllowedFromUi: false;
  recoveryTriggerAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type ProviderLocalConnectorAutomationCohesionReviewModel = {
  title: "Provider local connector automation cohesion review";
  summary: string;
  reviews: ProviderLocalConnectorAutomationCohesionReview[];
  boundary: ProviderLocalConnectorAutomationCohesionReviewBoundary;
  cohesionLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderLocalConnectorAutomationCohesionReviewStableKey(
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
