export type ControlledLiveCapabilitySignoffStatus = "ready-for-review" | "blocked";

export type ControlledLiveCapabilitySignoff = {
  id: string;
  controlledLiveCapabilitySignoffIdentity: string;
  liveCapabilityGroups: string[];
  providerLocalConnectorAutomationReadinessChecklist: string[];
  approvalEvidenceResultRecoveryReadinessChecklist: string[];
  releaseReadinessChecklist: string[];
  deniedSignoffActions: string[];
  unresolvedLiveCapabilityBlockers: string[];
  dailyBetaReleaseCandidateRoute: string;
  dailyBetaControlledOperatorTrialRoute: string;
  nextRecommendedAction: string;
  status: ControlledLiveCapabilitySignoffStatus;
  advancedSignoffDetails: string;
};

export type ControlledLiveCapabilitySignoffBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  controlledLiveCapabilitySignoffDoesNotSignOffAutomatically: true;
  controlledLiveCapabilityRequiresExplicitOperatorApproval: true;
  unresolvedLiveCapabilityBlockersStayBlocked: true;
  liveSignoffAutomationAllowedFromUi: false;
  goLiveAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
};

export type ControlledLiveCapabilitySignoffModel = {
  title: "Controlled live capability signoff";
  summary: string;
  signoffs: ControlledLiveCapabilitySignoff[];
  boundary: ControlledLiveCapabilitySignoffBoundary;
  signoffLanguage: string[];
  advancedDetails: string[];
};

export function buildControlledLiveCapabilitySignoffStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
