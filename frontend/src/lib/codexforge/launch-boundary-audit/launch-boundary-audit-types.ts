export type LaunchBoundaryAuditStatus = "ready-for-review" | "blocked";

export type LaunchBoundaryAudit = {
  id: string;
  launchBoundaryAuditIdentity: string;
  boundaryAuditGroups: string[];
  providerLocalConnectorAutomationBoundaryChecklist: string[];
  fileTestProjectExecutionChecklist: string[];
  evidenceLoggingAuditChecklist: string[];
  rollbackStopChecklist: string[];
  deniedAuditActions: string[];
  unresolvedBoundaryAuditBlockers: string[];
  launchApprovalPacketRoute: string;
  launchGoNoGoRoute: string;
  nextRecommendedAction: string;
  status: LaunchBoundaryAuditStatus;
  advancedLaunchBoundaryAuditDetails: string;
};

export type LaunchBoundaryAuditBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  boundaryProbeExecutionAllowedFromUi: false;
  launchBoundaryApprovalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  dailyBetaOneLaunchAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type LaunchBoundaryAuditModel = {
  title: "Launch boundary audit";
  summary: string;
  launchBoundaryAudits: LaunchBoundaryAudit[];
  boundary: LaunchBoundaryAuditBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildLaunchBoundaryAuditStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
