export type DailyBetaOneControlledLaunchCandidateStatus = "ready-for-review" | "blocked";

export type DailyBetaOneControlledLaunchCandidate = {
  id: string;
  controlledLaunchCandidateIdentity: string;
  launchReviewStatus: string[];
  evidenceResultRecoveryHardeningStatus: string[];
  rollbackMonitoringSupportStatus: string[];
  boundaryReadinessStatus: string[];
  deniedCandidateActions: string[];
  unresolvedCandidateBlockers: string[];
  controlledLaunchHandoffRoute: string;
  controlledLaunchReadinessLockRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneControlledLaunchCandidateStatus;
  advancedDailyBetaOneControlledLaunchCandidateDetails: string;
};

export type DailyBetaOneControlledLaunchCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaOneLaunchAllowedFromUi: false;
  goLiveAllowedFromUi: false;
  controlledLaunchExecutionAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  launchSettingsPersistenceAllowedFromUi: false;
  launchApprovalAutomationAllowedFromUi: false;
  launchReadinessLockAutomationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type DailyBetaOneControlledLaunchCandidateModel = {
  title: "Daily Beta 1 controlled launch candidate";
  summary: string;
  dailyBetaOneControlledLaunchCandidates: DailyBetaOneControlledLaunchCandidate[];
  boundary: DailyBetaOneControlledLaunchCandidateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneControlledLaunchCandidateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
