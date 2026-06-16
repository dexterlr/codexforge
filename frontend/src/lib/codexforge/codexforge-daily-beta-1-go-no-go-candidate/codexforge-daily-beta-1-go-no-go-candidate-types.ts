export type CodexForgeDailyBetaOneGoNoGoCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeDailyBetaOneGoNoGoCandidate = {
  id: string;
  dailyBetaOneGoNoGoCandidateIdentity: string;
  boundaryAuditStatus: string[];
  approvalPacketStatus: string[];
  rollbackMonitoringSupportStatus: string[];
  launchCandidateStatus: string[];
  deniedGoNoGoCandidateActions: string[];
  unresolvedGoNoGoCandidateBlockers: string[];
  firstControlledLaunchPlanRoute: string;
  launchReadinessLockRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeDailyBetaOneGoNoGoCandidateStatus;
  advancedCodexForgeDailyBetaOneGoNoGoCandidateDetails: string;
};

export type CodexForgeDailyBetaOneGoNoGoCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaOneLaunchAllowedFromUi: false;
  goNoGoDecisionAllowedFromUi: false;
  launchSettingsPersistenceAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type CodexForgeDailyBetaOneGoNoGoCandidateModel = {
  title: "CodexForge Daily Beta 1 go/no-go candidate";
  summary: string;
  goNoGoCandidates: CodexForgeDailyBetaOneGoNoGoCandidate[];
  boundary: CodexForgeDailyBetaOneGoNoGoCandidateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildCodexForgeDailyBetaOneGoNoGoCandidateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
