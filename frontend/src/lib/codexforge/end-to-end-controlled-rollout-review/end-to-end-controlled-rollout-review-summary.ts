import type { EndToEndControlledRolloutReview, EndToEndControlledRolloutReviewBoundary, EndToEndControlledRolloutReviewModel } from "./end-to-end-controlled-rollout-review-types";
import { buildEndToEndControlledRolloutReviewStableKey } from "./end-to-end-controlled-rollout-review-types";

export const END_TO_END_CONTROLLED_ROLLOUT_REVIEW_LANGUAGE = [
  "End-to-end controlled rollout review",
  "End-to-end controlled rollout review does not proceed automatically",
  "Rollout decisions require explicit operator approval",
  "Unresolved rollout review blockers stay blocked",
  "Rollout review groups",
  "Operator experience checklist",
] as const;

export function buildEndToEndControlledRolloutReview(input: Omit<EndToEndControlledRolloutReview, "id"> & { idHint: string }): EndToEndControlledRolloutReview {
  const { idHint, ...review } = input;
  return { id: buildEndToEndControlledRolloutReviewStableKey("end-to-end-controlled-rollout-review", idHint, input.status), ...review };
}

export function buildEndToEndControlledRolloutReviews(): EndToEndControlledRolloutReview[] {
  return [
    buildEndToEndControlledRolloutReview({
      idHint: "end-to-end-controlled-rollout-review-packet",
      status: "blocked",
      controlledRolloutReviewIdentity: "Controlled rollout review identity: end-to-end-controlled-rollout-review-packet.",
      rolloutReviewGroups: [
        "Rollout review groups: readiness review, operator experience review, safety/regression review, rollback readiness review, feedback inbox review, and regression review handoff.",
      ],
      readinessReviewChecklist: [
        "Readiness review checklist: release candidate blockers, cohort approval, rollout owner, evidence owner, rollback owner, and explicit operator approval must be reviewed before proceeding.",
      ],
      operatorExperienceChecklist: [
        "Operator experience checklist: novice clarity, route language, feedback entry points, support owner, stop criteria, and handoff wording stay review-only.",
      ],
      safetyRegressionChecklist: [
        "Safety/regression checklist: provider, local model, connector, automation, file, test, feedback, memory, credential, and output risks remain blocked until approved.",
      ],
      rollbackReadinessChecklist: [
        "Rollback readiness checklist: halt triggers, owner routing, evidence capture, recovery review route, and blocked-path copy must be approved outside this page.",
      ],
      deniedRolloutReviewActions: [
        "Denied rollout review actions: proceed automatically, execute workflows, execute rollout, persist rollout decisions, approve actions, call providers, call local models, call connectors, create automations, mutate files, or store outputs.",
      ],
      unresolvedRolloutReviewBlockers: [
        "Unresolved rollout review blockers: missing final rollout decision, unresolved safety/regression review, unapproved rollback owner, and missing feedback owner.",
      ],
      rolloutFeedbackInboxRoute: "Rollout feedback inbox route: /end-to-end-rollout-feedback-inbox reviews feedback without auto-ingesting feedback.",
      rolloutRegressionReviewRoute: "Rollout regression review route: /end-to-end-rollout-regression-review reviews regressions without running tests.",
      nextRecommendedAction: "Next recommended action: keep rollout review blocked until readiness, operator experience, safety/regression, rollback, and feedback owners approve outside this page.",
      advancedControlledRolloutReviewDetails: "Advanced controlled rollout review details: End-to-end controlled rollout review is review-only. End-to-end controlled rollout review does not proceed automatically, rollout decisions require explicit operator approval, and unresolved rollout review blockers stay blocked. It does not execute workflows, execute rollout, proceed automatically, persist rollout decisions, approve actions, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildEndToEndControlledRolloutReviewBoundary(): EndToEndControlledRolloutReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, rolloutProceedAutomationAllowedFromUi: false, rolloutDecisionPersistenceAllowedFromUi: false, workflowExecutionAllowedFromUi: false, rolloutExecutionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, approvalAutomationAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeEndToEndControlledRolloutReview(model: Pick<EndToEndControlledRolloutReviewModel, "reviews">): string {
  return "End-to-end controlled rollout review summarizes " + model.reviews.length + " rollout review packet without proceeding automatically. Rollout decisions require explicit operator approval, and unresolved rollout review blockers stay blocked.";
}

export function buildEndToEndControlledRolloutReviewModel(): EndToEndControlledRolloutReviewModel {
  const reviews = buildEndToEndControlledRolloutReviews();
  const model: EndToEndControlledRolloutReviewModel = {
    title: "End-to-end controlled rollout review",
    summary: "",
    reviews,
    boundary: buildEndToEndControlledRolloutReviewBoundary(),
    language: [...END_TO_END_CONTROLLED_ROLLOUT_REVIEW_LANGUAGE],
    advancedDetails: [
      "End-to-end controlled rollout review",
      "Controlled rollout review identity",
      "Rollout review groups",
      "Readiness review checklist",
      "Operator experience checklist",
      "Safety/regression checklist",
      "Rollback readiness checklist",
      "Denied rollout review actions",
      "Unresolved rollout review blockers",
      "Rollout feedback inbox route",
      "Rollout regression review route",
      "Next recommended action",
      "End-to-end controlled rollout review does not proceed automatically",
      "Rollout decisions require explicit operator approval",
      "Unresolved rollout review blockers stay blocked",
      "advanced controlled rollout review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeEndToEndControlledRolloutReview(model) };
}
