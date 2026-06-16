export type DailyBetaActivationReleaseHandoffStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationReleaseHandoff = {
  id: string;
  activationReleaseHandoffIdentity: string;
  handoffGroups: string[];
  operatorRunbookSummary: string[];
  finalGateSummary: string[];
  liveBoundaryLimitationSummary: string[];
  rolloutLimitationSummary: string[];
  deniedHandoffActions: string[];
  unresolvedHandoffBlockers: string[];
  readinessLockRoute: string;
  activationCandidateRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationReleaseHandoffStatus;
  advancedDailyBetaActivationReleaseHandoffDetails: string;
};

export type DailyBetaActivationReleaseHandoffBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  handoffSendAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaActivationReleaseHandoffModel = {
  title: "Daily Beta activation release handoff";
  summary: string;
  releaseHandoffs: DailyBetaActivationReleaseHandoff[];
  boundary: DailyBetaActivationReleaseHandoffBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationReleaseHandoffStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
