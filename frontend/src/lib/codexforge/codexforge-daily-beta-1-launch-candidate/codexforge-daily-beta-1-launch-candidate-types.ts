export type CodexForgeDailyBetaOneLaunchCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeDailyBetaOneLaunchCandidate = {
  id: string;
  dailyBetaOneLaunchCandidateIdentity: string;
  activationLockAuditStatus: string[];
  finalHandoffStatus: string[];
  launchReadinessDryRunEvidenceResultStatus: string[];
  liveBoundaryStatus: string[];
  deniedLaunchCandidateActions: string[];
  unresolvedLaunchCandidateBlockers: string[];
  launchReadinessLockRoute: string;
  releaseReadinessDashboardRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeDailyBetaOneLaunchCandidateStatus;
  advancedCodexForgeDailyBetaOneLaunchCandidateDetails: string;
};

export type CodexForgeDailyBetaOneLaunchCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaOneLaunchAllowedFromUi: false;
  goLiveAllowedFromUi: false;
  launchSettingsPersistenceAllowedFromUi: false;
  launchApprovalAutomationAllowedFromUi: false;
  launchReadinessLockAutomationAllowedFromUi: false;
  launchDryRunExecutionAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  resultPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type CodexForgeDailyBetaOneLaunchCandidateModel = {
  title: "CodexForge Daily Beta 1 launch candidate";
  summary: string;
  launchCandidates: CodexForgeDailyBetaOneLaunchCandidate[];
  boundary: CodexForgeDailyBetaOneLaunchCandidateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildCodexForgeDailyBetaOneLaunchCandidateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
