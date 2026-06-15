export type FirstApprovedLocalModelExecutionTrialStatus = "ready-for-review" | "blocked";

export type FirstApprovedLocalModelExecutionTrial = {
  id: string;
  firstApprovedLocalModelTrialIdentity: string;
  localModelTrialGroups: string[];
  approvalGateChecklist: string[];
  localBridgeChecklist: string[];
  promptPrivacyChecklist: string[];
  evidenceResultChecklist: string[];
  deniedLocalModelTrialActions: string[];
  unresolvedLocalModelTrialBlockers: string[];
  firstApprovedConnectorAccessTrialRoute: string;
  firstApprovedAutomationDryRunRoute: string;
  nextRecommendedAction: string;
  status: FirstApprovedLocalModelExecutionTrialStatus;
  advancedLocalModelTrialDetails: string;
};

export type FirstApprovedLocalModelExecutionTrialBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  localModelOutputStorageAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type FirstApprovedLocalModelExecutionTrialModel = {
  title: "First approved local model execution trial";
  summary: string;
  localModelTrials: FirstApprovedLocalModelExecutionTrial[];
  boundary: FirstApprovedLocalModelExecutionTrialBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstApprovedLocalModelExecutionTrialStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
