export type FirstRealDailyWorkflowCandidateStatus = "ready-for-review" | "blocked";

export type FirstRealDailyWorkflowCandidate = {
  id: string;
  firstRealDailyWorkflowIdentity: string;
  workflowStageGroups: string[];
  operatorTaskChecklist: string[];
  approvalGateChecklist: string[];
  providerLocalConnectorAutomationHandoffChecklist: string[];
  evidenceCaptureChecklist: string[];
  deniedWorkflowActions: string[];
  blockedWorkflowRisks: string[];
  realDailyWorkflowEvidenceReviewRoute: string;
  realDailyWorkflowResultReviewRoute: string;
  nextRecommendedAction: string;
  status: FirstRealDailyWorkflowCandidateStatus;
  advancedWorkflowDetails: string;
};

export type FirstRealDailyWorkflowCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  firstRealDailyWorkflowCandidateDoesNotExecuteWorkflows: true;
  realDailyWorkflowActionsRequireExplicitOperatorApproval: true;
  unapprovedWorkflowPathsRemainBlocked: true;
  workflowExecutionAllowedFromUi: false;
  realDailyWorkflowLaunchAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  resultIngestionAllowedFromUi: false;
  outputStorageAllowed: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type FirstRealDailyWorkflowCandidateModel = {
  title: "First real daily workflow candidate";
  summary: string;
  candidates: FirstRealDailyWorkflowCandidate[];
  boundary: FirstRealDailyWorkflowCandidateBoundary;
  workflowLanguage: string[];
  advancedDetails: string[];
};

export function buildFirstRealDailyWorkflowCandidateStableKey(
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
