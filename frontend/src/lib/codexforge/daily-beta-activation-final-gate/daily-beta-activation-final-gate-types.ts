export type DailyBetaActivationFinalGateStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationFinalGate = {
  id: string;
  activationFinalGateIdentity: string;
  finalGateGroups: string[];
  activationChecklistStatus: string[];
  dryRunEvidenceResultRecoveryHardeningStatus: string[];
  liveBoundaryStatus: string[];
  operatorReadinessStatus: string[];
  deniedFinalGateActions: string[];
  unresolvedFinalGateBlockers: string[];
  controlledOperatorTrialRoute: string;
  feedbackInboxRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationFinalGateStatus;
  advancedDailyBetaActivationFinalGateDetails: string;
};

export type DailyBetaActivationFinalGateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaActivationAllowedFromUi: false;
  finalGateAutoPassAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaActivationFinalGateModel = {
  title: "Daily Beta activation final gate";
  summary: string;
  finalGates: DailyBetaActivationFinalGate[];
  boundary: DailyBetaActivationFinalGateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationFinalGateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
