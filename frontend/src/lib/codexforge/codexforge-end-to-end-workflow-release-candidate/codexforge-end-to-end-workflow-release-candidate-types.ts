export type CodexForgeEndToEndWorkflowReleaseCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeEndToEndWorkflowReleaseCandidate = {
  id: string;
  endToEndReleaseCandidateIdentity: string;
  testExecutionStatus: string[];
  workflowPlanTrialStatus: string[];
  evidenceResultRecoveryHardeningStatus: string[];
  boundaryReadinessStatus: string[];
  deniedReleaseCandidateActions: string[];
  unresolvedReleaseCandidateBlockers: string[];
  nextControlledRolloutRoute: string;
  checkpointDocsRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeEndToEndWorkflowReleaseCandidateStatus;
  advancedReleaseCandidateDetails: string;
};

export type CodexForgeEndToEndWorkflowReleaseCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  goLiveAllowedFromUi: false;
  rolloutExecutionAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  releaseApprovalAutomationAllowedFromUi: false;
  releaseSettingsPersistenceAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type CodexForgeEndToEndWorkflowReleaseCandidateModel = {
  title: "CodexForge end-to-end workflow release candidate";
  summary: string;
  releaseCandidates: CodexForgeEndToEndWorkflowReleaseCandidate[];
  boundary: CodexForgeEndToEndWorkflowReleaseCandidateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildCodexForgeEndToEndWorkflowReleaseCandidateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
