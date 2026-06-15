export type FirstApprovedProviderExecutionTrialStatus = "ready-for-review" | "blocked";

export type FirstApprovedProviderExecutionTrial = {
  id: string;
  firstApprovedProviderTrialIdentity: string;
  providerTrialGroups: string[];
  approvalGateChecklist: string[];
  promptPrivacyChecklist: string[];
  budgetRateLimitChecklist: string[];
  evidenceResultChecklist: string[];
  deniedProviderTrialActions: string[];
  unresolvedProviderTrialBlockers: string[];
  firstApprovedLocalModelTrialRoute: string;
  firstApprovedConnectorAccessTrialRoute: string;
  nextRecommendedAction: string;
  status: FirstApprovedProviderExecutionTrialStatus;
  advancedProviderTrialDetails: string;
};

export type FirstApprovedProviderExecutionTrialBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  providerApiCallsAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type FirstApprovedProviderExecutionTrialModel = {
  title: "First approved provider execution trial";
  summary: string;
  providerTrials: FirstApprovedProviderExecutionTrial[];
  boundary: FirstApprovedProviderExecutionTrialBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstApprovedProviderExecutionTrialStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
