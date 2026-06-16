export type LiveExecutionBoundaryFinalSignoffStatus = "ready-for-review" | "blocked";

export type LiveExecutionBoundaryFinalSignoff = {
  id: string;
  liveExecutionBoundaryFinalSignoffIdentity: string;
  boundarySignoffGroups: string[];
  providerLocalConnectorAutomationChecklist: string[];
  fileTestExecutionChecklist: string[];
  auditEvidenceLoggingChecklist: string[];
  rollbackStopChecklist: string[];
  deniedSignoffActions: string[];
  unresolvedBoundarySignoffBlockers: string[];
  dailyBetaCandidateRoute: string;
  operatorHandoffRoute: string;
  nextRecommendedAction: string;
  status: LiveExecutionBoundaryFinalSignoffStatus;
  advancedLiveExecutionBoundaryFinalSignoffDetails: string;
};

export type LiveExecutionBoundaryFinalSignoffBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  liveBoundarySignoffAutomationAllowedFromUi: false;
  goLiveAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type LiveExecutionBoundaryFinalSignoffModel = {
  title: "Live execution boundary final signoff";
  summary: string;
  signoffs: LiveExecutionBoundaryFinalSignoff[];
  boundary: LiveExecutionBoundaryFinalSignoffBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildLiveExecutionBoundaryFinalSignoffStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
