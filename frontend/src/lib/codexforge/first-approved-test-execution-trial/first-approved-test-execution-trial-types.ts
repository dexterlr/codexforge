export type FirstApprovedTestExecutionTrialStatus = "ready-for-review" | "blocked";

export type FirstApprovedTestExecutionTrial = {
  id: string;
  firstApprovedTestExecutionIdentity: string;
  testTrialGroups: string[];
  approvedCommandChecklist: string[];
  workspaceScopeChecklist: string[];
  timeoutLoggingChecklist: string[];
  evidenceResultChecklist: string[];
  deniedTestExecutionActions: string[];
  unresolvedTestExecutionBlockers: string[];
  firstRealEndToEndWorkflowTrialPlanRoute: string;
  endToEndEvidenceReviewRoute: string;
  nextRecommendedAction: string;
  status: FirstApprovedTestExecutionTrialStatus;
  advancedTestExecutionTrialDetails: string;
};

export type FirstApprovedTestExecutionTrialBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type FirstApprovedTestExecutionTrialModel = {
  title: "First approved test execution trial";
  summary: string;
  testExecutionTrials: FirstApprovedTestExecutionTrial[];
  boundary: FirstApprovedTestExecutionTrialBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstApprovedTestExecutionTrialStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
