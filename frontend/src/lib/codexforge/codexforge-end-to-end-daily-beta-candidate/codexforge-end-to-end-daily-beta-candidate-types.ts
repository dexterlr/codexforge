export type CodexForgeEndToEndDailyBetaCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeEndToEndDailyBetaCandidate = {
  id: string;
  endToEndDailyBetaCandidateIdentity: string;
  releaseCandidateStatus: string[];
  rolloutStatus: string[];
  feedbackRegressionHardeningStatus: string[];
  liveBoundarySignoffStatus: string[];
  deniedDailyBetaCandidateActions: string[];
  unresolvedDailyBetaCandidateBlockers: string[];
  operatorHandoffRoute: string;
  checkpointDocsRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeEndToEndDailyBetaCandidateStatus;
  advancedEndToEndDailyBetaCandidateDetails: string;
};

export type CodexForgeEndToEndDailyBetaCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  goLiveAllowedFromUi: false;
  dailyBetaActivationPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  rolloutExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type CodexForgeEndToEndDailyBetaCandidateModel = {
  title: "CodexForge end-to-end Daily Beta candidate";
  summary: string;
  candidates: CodexForgeEndToEndDailyBetaCandidate[];
  boundary: CodexForgeEndToEndDailyBetaCandidateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildCodexForgeEndToEndDailyBetaCandidateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
