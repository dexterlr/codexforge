export type FirstApprovedConnectorAccessTrialStatus = "ready-for-review" | "blocked";

export type FirstApprovedConnectorAccessTrial = {
  id: string;
  firstApprovedConnectorTrialIdentity: string;
  connectorTrialGroups: string[];
  accountPermissionChecklist: string[];
  sourceRedactionChecklist: string[];
  evidenceCitationChecklist: string[];
  rollbackRevocationChecklist: string[];
  deniedConnectorTrialActions: string[];
  unresolvedConnectorTrialBlockers: string[];
  firstApprovedAutomationDryRunRoute: string;
  firstApprovedFilePatchDryRunRoute: string;
  nextRecommendedAction: string;
  status: FirstApprovedConnectorAccessTrialStatus;
  advancedConnectorTrialDetails: string;
};

export type FirstApprovedConnectorAccessTrialBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  connectorApiCallsAllowedFromUi: false;
  connectorAccountConnectionAllowedFromUi: false;
  connectorDataFetchAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type FirstApprovedConnectorAccessTrialModel = {
  title: "First approved connector access trial";
  summary: string;
  connectorTrials: FirstApprovedConnectorAccessTrial[];
  boundary: FirstApprovedConnectorAccessTrialBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstApprovedConnectorAccessTrialStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
