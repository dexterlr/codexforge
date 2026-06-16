import type { EndToEndControlledRolloutPlan, EndToEndControlledRolloutPlanBoundary, EndToEndControlledRolloutPlanModel } from "./end-to-end-controlled-rollout-plan-types";
import { buildEndToEndControlledRolloutPlanStableKey } from "./end-to-end-controlled-rollout-plan-types";

export const END_TO_END_CONTROLLED_ROLLOUT_PLAN_LANGUAGE = [
  "End-to-end controlled rollout plan",
  "End-to-end controlled rollout plan does not execute rollout",
  "Rollout actions require explicit operator approval",
  "Unapproved rollout paths remain blocked",
  "Rollout stage groups",
  "Operator cohort checklist",
] as const;

export function buildEndToEndControlledRolloutPlan(input: Omit<EndToEndControlledRolloutPlan, "id"> & { idHint: string }): EndToEndControlledRolloutPlan {
  const { idHint, ...plan } = input;
  return { id: buildEndToEndControlledRolloutPlanStableKey("end-to-end-controlled-rollout-plan", idHint, input.status), ...plan };
}

export function buildEndToEndControlledRolloutPlans(): EndToEndControlledRolloutPlan[] {
  return [
    buildEndToEndControlledRolloutPlan({
      idHint: "end-to-end-controlled-rollout-plan-packet",
      status: "blocked",
      controlledRolloutPlanIdentity: "Controlled rollout plan identity: end-to-end-controlled-rollout-plan-packet.",
      rolloutStageGroups: [
        "Rollout stage groups: release candidate review, operator cohort review, approval gate review, rollback review, monitoring/evidence review, and feedback inbox review.",
      ],
      operatorCohortChecklist: [
        "Operator cohort checklist: named operators, owner roles, support path, feedback owner, safety owner, and rollback contact must be approved outside this page.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: rollout owner approval, safety owner approval, evidence owner approval, rollback owner approval, feedback owner approval, and explicit operator approval are required before any rollout action.",
      ],
      rollbackChecklist: [
        "Rollback checklist: halt criteria, recovery owner, rollback route, communication owner, evidence capture owner, and blocked-path language stay review-only here.",
      ],
      monitoringEvidenceChecklist: [
        "Monitoring/evidence checklist: operator experience signals, safety blockers, regression signals, feedback review, release candidate evidence, and rollout review evidence require operator review before use.",
      ],
      deniedRolloutPlanActions: [
        "Denied rollout plan actions: execute rollout, proceed with rollout, send notifications, create automations, create background jobs, call providers, call local models, call connectors, mutate files, store outputs, or persist approval decisions.",
      ],
      unresolvedRolloutPlanBlockers: [
        "Unresolved rollout plan blockers: missing cohort approval, missing rollback owner, unresolved release-candidate blockers, missing monitoring owner, and missing feedback review owner.",
      ],
      rolloutReviewRoute: "Rollout review route: /end-to-end-controlled-rollout-review reviews rollout readiness without proceeding automatically.",
      rolloutFeedbackInboxRoute: "Rollout feedback inbox route: /end-to-end-rollout-feedback-inbox reviews feedback without auto-ingesting feedback.",
      nextRecommendedAction: "Next recommended action: keep the controlled rollout blocked until the cohort, approval gate, rollback, monitoring/evidence, and feedback owners approve outside this page.",
      advancedControlledRolloutPlanDetails: "Advanced controlled rollout plan details: End-to-end controlled rollout plan is review-only. End-to-end controlled rollout plan does not execute rollout, rollout actions require explicit operator approval, and unapproved rollout paths remain blocked. It does not execute workflows, run controlled rollout, proceed automatically, send notifications, create automations, create background jobs, call providers, call local models, call connectors, mutate files, mutate memory, persist approval decisions, store outputs, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildEndToEndControlledRolloutPlanBoundary(): EndToEndControlledRolloutPlanBoundary {
  return { reviewOnly: true, approvalRequired: true, rolloutExecutionAllowedFromUi: false, rolloutAutoProceedAllowedFromUi: false, workflowExecutionAllowedFromUi: false, notificationSendingAllowedFromUi: false, automationCreationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, approvalAutomationAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeEndToEndControlledRolloutPlan(model: Pick<EndToEndControlledRolloutPlanModel, "plans">): string {
  return "End-to-end controlled rollout plan reviews " + model.plans.length + " rollout plan packet without executing rollout. Rollout actions require explicit operator approval, and unapproved rollout paths remain blocked.";
}

export function buildEndToEndControlledRolloutPlanModel(): EndToEndControlledRolloutPlanModel {
  const plans = buildEndToEndControlledRolloutPlans();
  const model: EndToEndControlledRolloutPlanModel = {
    title: "End-to-end controlled rollout plan",
    summary: "",
    plans,
    boundary: buildEndToEndControlledRolloutPlanBoundary(),
    language: [...END_TO_END_CONTROLLED_ROLLOUT_PLAN_LANGUAGE],
    advancedDetails: [
      "End-to-end controlled rollout plan",
      "Controlled rollout plan identity",
      "Rollout stage groups",
      "Operator cohort checklist",
      "Approval gate checklist",
      "Rollback checklist",
      "Monitoring/evidence checklist",
      "Denied rollout plan actions",
      "Unresolved rollout plan blockers",
      "Rollout review route",
      "Rollout feedback inbox route",
      "Next recommended action",
      "End-to-end controlled rollout plan does not execute rollout",
      "Rollout actions require explicit operator approval",
      "Unapproved rollout paths remain blocked",
      "advanced controlled rollout plan details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeEndToEndControlledRolloutPlan(model) };
}
