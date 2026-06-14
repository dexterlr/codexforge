import type {
  DailyBetaOneRolloutReview,
  DailyBetaOneRolloutReviewBoundary,
  DailyBetaOneRolloutReviewModel,
} from "./daily-beta-1-rollout-review-types";
import { buildDailyBetaOneRolloutReviewStableKey } from "./daily-beta-1-rollout-review-types";

export const DAILY_BETA_ONE_ROLLOUT_REVIEW_LANGUAGE = [
  "Daily Beta 1 rollout review",
  "Daily Beta 1 rollout review does not proceed automatically",
  "Rollout decisions require explicit operator approval",
  "Unresolved rollout review blockers stay blocked",
  "Rollout review groups",
  "Operator experience checklist",
] as const;

export function buildDailyBetaOneRolloutReview(
  input: Omit<DailyBetaOneRolloutReview, "id"> & { idHint: string }
): DailyBetaOneRolloutReview {
  const { idHint, ...review } = input;
  return {
    id: buildDailyBetaOneRolloutReviewStableKey("daily-beta-1-rollout-review", idHint, input.status),
    ...review,
  };
}

export function buildDailyBetaOneRolloutReviews(): DailyBetaOneRolloutReview[] {
  return [
    buildDailyBetaOneRolloutReview({
      idHint: "daily-beta-1-rollout-review",
      status: "blocked",
      dailyBetaOneRolloutReviewIdentity:
        "Daily Beta 1 rollout review identity: daily-beta-1-rollout-review-daily-beta-1-rollout-review.",
      rolloutReviewGroups: [
        "Rollout review groups: readiness review, operator experience review, safety/regression review, rollback readiness review, feedback review, and hardening return path.",
      ],
      readinessReviewChecklist: [
        "Readiness review checklist: candidate approval, rollout plan approval, cohort approval, rollback owner, monitoring owner, and feedback owner must be reviewed outside this page.",
      ],
      operatorExperienceChecklist: [
        "Operator experience checklist: novice clarity, expert scan path, blocked-state wording, feedback path, support route, and next action must be readable.",
      ],
      safetyRegressionChecklist: [
        "Safety/regression checklist: no workflow execution, no provider traffic, no connector calls, no automation creation, no regression/test execution from UI, and no release approval automation.",
      ],
      rollbackReadinessChecklist: [
        "Rollback readiness checklist: halt criteria, owner names, blocked path copy, evidence capture, recovery route, and return-to-hardening path must be ready.",
      ],
      deniedRolloutReviewActions: [
        "Denied rollout review actions: proceed automatically, execute workflows, persist rollout decisions, launch Daily Beta 1, approve release, call providers, call connectors, create automations, or store outputs.",
      ],
      unresolvedRolloutReviewBlockers: [
        "Unresolved rollout review blockers: missing operator feedback owner, stale safety copy, unresolved regression signal, incomplete rollback route, and missing hardening return owner.",
      ],
      dailyBetaOneFeedbackInboxRoute:
        "Daily Beta 1 feedback inbox route: /daily-beta-1-feedback-inbox reviews feedback without auto-ingesting feedback.",
      dailyBetaHardeningRoute:
        "Daily Beta hardening route: /daily-beta-hardening-pass reviews hardening needs without applying changes.",
      nextRecommendedAction:
        "Next recommended action: keep rollout review blocked until readiness, operator experience, safety/regression, rollback, feedback, and hardening owners approve outside this page.",
      advancedRolloutReviewDetails:
        "Advanced rollout review details: Daily Beta 1 rollout review is review-only. Daily Beta 1 rollout review does not proceed automatically, rollout decisions require explicit operator approval, and unresolved rollout review blockers stay blocked. It does not execute workflows, persist rollout decisions, launch Daily Beta 1, call providers, call local models, call connectors, create automations, store outputs, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaOneRolloutReviewBoundary(): DailyBetaOneRolloutReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    dailyBetaOneRolloutReviewDoesNotProceedAutomatically: true,
    rolloutDecisionsRequireExplicitOperatorApproval: true,
    unresolvedRolloutReviewBlockersStayBlocked: true,
    rolloutAutoProceedAllowedFromUi: false,
    rolloutDecisionPersistenceAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    outputStorageAllowed: false,
  };
}

export function summarizeDailyBetaOneRolloutReview(
  model: Pick<DailyBetaOneRolloutReviewModel, "reviews">
): string {
  return `Daily Beta 1 rollout review reviews ${model.reviews.length} rollout posture without proceeding automatically. Rollout decisions require explicit operator approval, and unresolved rollout review blockers stay blocked.`;
}

export function buildDailyBetaOneRolloutReviewModel(): DailyBetaOneRolloutReviewModel {
  const reviews = buildDailyBetaOneRolloutReviews();
  const model: DailyBetaOneRolloutReviewModel = {
    title: "Daily Beta 1 rollout review",
    summary: "",
    reviews,
    boundary: buildDailyBetaOneRolloutReviewBoundary(),
    rolloutReviewLanguage: [...DAILY_BETA_ONE_ROLLOUT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Daily Beta 1 rollout review",
      "Daily Beta 1 rollout review identity",
      "Rollout review groups",
      "Readiness review checklist",
      "Operator experience checklist",
      "Safety/regression checklist",
      "Rollback readiness checklist",
      "Denied rollout review actions",
      "Unresolved rollout review blockers",
      "Daily Beta 1 feedback inbox route",
      "Daily Beta hardening route",
      "Next recommended action",
      "Daily Beta 1 rollout review does not proceed automatically",
      "Rollout decisions require explicit operator approval",
      "Unresolved rollout review blockers stay blocked",
      "advanced rollout review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaOneRolloutReview(model) };
}
