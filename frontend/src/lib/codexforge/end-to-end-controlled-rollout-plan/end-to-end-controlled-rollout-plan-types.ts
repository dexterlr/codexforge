export type EndToEndControlledRolloutPlanStatus = "ready-for-review" | "blocked";

export type EndToEndControlledRolloutPlan = {
  id: string;
  controlledRolloutPlanIdentity: string;
  rolloutStageGroups: string[];
  operatorCohortChecklist: string[];
  approvalGateChecklist: string[];
  rollbackChecklist: string[];
  monitoringEvidenceChecklist: string[];
  deniedRolloutPlanActions: string[];
  unresolvedRolloutPlanBlockers: string[];
  rolloutReviewRoute: string;
  rolloutFeedbackInboxRoute: string;
  nextRecommendedAction: string;
  status: EndToEndControlledRolloutPlanStatus;
  advancedControlledRolloutPlanDetails: string;
};

export type EndToEndControlledRolloutPlanBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  rolloutExecutionAllowedFromUi: false;
  rolloutAutoProceedAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type EndToEndControlledRolloutPlanModel = {
  title: "End-to-end controlled rollout plan";
  summary: string;
  plans: EndToEndControlledRolloutPlan[];
  boundary: EndToEndControlledRolloutPlanBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildEndToEndControlledRolloutPlanStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
