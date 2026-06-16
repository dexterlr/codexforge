export type DailyBetaOneControlledLaunchHandoffStatus = "ready-for-review" | "blocked";

export type DailyBetaOneControlledLaunchHandoff = {
  id: string;
  controlledLaunchHandoffIdentity: string;
  handoffGroups: string[];
  operatorRunbookSummary: string[];
  controlledLaunchLimitationSummary: string[];
  rollbackMonitoringSummary: string[];
  validationChecklist: string[];
  deniedHandoffActions: string[];
  unresolvedHandoffBlockers: string[];
  controlledLaunchReadinessLockRoute: string;
  goNoGoCandidateRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneControlledLaunchHandoffStatus;
  advancedDailyBetaOneControlledLaunchHandoffDetails: string;
};

export type DailyBetaOneControlledLaunchHandoffBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  handoffSendAllowedFromUi: false;
  handoffApplyAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type DailyBetaOneControlledLaunchHandoffModel = {
  title: "Daily Beta 1 controlled launch handoff";
  summary: string;
  dailyBetaOneControlledLaunchHandoffs: DailyBetaOneControlledLaunchHandoff[];
  boundary: DailyBetaOneControlledLaunchHandoffBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneControlledLaunchHandoffStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
