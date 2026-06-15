export type FirstApprovedAutomationDryRunTrialStatus = "ready-for-review" | "blocked";

export type FirstApprovedAutomationDryRunTrial = {
  id: string;
  firstApprovedAutomationDryRunIdentity: string;
  automationDryRunGroups: string[];
  approvalGateChecklist: string[];
  scheduleWatchChecklist: string[];
  notificationChecklist: string[];
  stopRollbackChecklist: string[];
  deniedAutomationDryRunActions: string[];
  unresolvedAutomationDryRunBlockers: string[];
  firstApprovedFilePatchDryRunRoute: string;
  unifiedExecutionGapReportRoute: string;
  nextRecommendedAction: string;
  status: FirstApprovedAutomationDryRunTrialStatus;
  advancedAutomationDryRunDetails: string;
};

export type FirstApprovedAutomationDryRunTrialBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  automationExecutionAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  automationRulePersistenceAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  scheduleCreationAllowedFromUi: false;
  conditionalWatchCreationAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  pollingLoopAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type FirstApprovedAutomationDryRunTrialModel = {
  title: "First approved automation dry-run trial";
  summary: string;
  automationDryRunTrials: FirstApprovedAutomationDryRunTrial[];
  boundary: FirstApprovedAutomationDryRunTrialBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstApprovedAutomationDryRunTrialStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
