import type { DailyBetaOneFeedbackTriageReview, DailyBetaOneFeedbackTriageReviewBoundary, DailyBetaOneFeedbackTriageReviewModel } from "./daily-beta-1-feedback-triage-review-types";
import { buildDailyBetaOneFeedbackTriageReviewStableKey } from "./daily-beta-1-feedback-triage-review-types";

export const DAILY_BETA_ONE_FEEDBACK_TRIAGE_REVIEW_LANGUAGE = [
  "Daily Beta 1 feedback triage review",
  "Daily Beta 1 feedback triage review does not auto-ingest feedback",
  "Triage decisions require explicit operator approval",
  "Unsafe triage shortcuts stay blocked",
  "Triage groups",
  "Severity priority checklist",
] as const;

export function buildDailyBetaOneFeedbackTriageReview(input: Omit<DailyBetaOneFeedbackTriageReview, "id"> & { idHint: string }): DailyBetaOneFeedbackTriageReview {
  const { idHint, ...packet } = input;
  return { id: buildDailyBetaOneFeedbackTriageReviewStableKey("daily-beta-1-feedback-triage-review", idHint, input.status), ...packet };
}

export function buildDailyBetaOneFeedbackTriageReviews(): DailyBetaOneFeedbackTriageReview[] {
  return [
    buildDailyBetaOneFeedbackTriageReview({
      idHint: "release-candidate-review-package",
      status: "ready-for-review",
      dailyBetaOneFeedbackTriageIdentity: "Daily Beta 1 feedback triage identity: daily-beta-1-feedback-triage-review-release-candidate-feedback.",
      triageGroups: [
        "Triage groups: usability queue, safety queue, rollout queue, release queue, severity review, priority review, and operator approval queue.",
      ],
      usabilityFeedbackQueue: [
        "Usability feedback queue: navigation clarity, novice wording, expert scanning, blocked-state copy, and next action clarity wait for operator review.",
      ],
      safetyFeedbackQueue: [
        "Safety feedback queue: approval bypass requests, live execution requests, provider/local/connector traffic requests, automation requests, file mutation requests, and memory-promotion requests stay blocked.",
      ],
      rolloutFeedbackQueue: [
        "Rollout feedback queue: cohort notes, rollback signals, support issues, monitoring gaps, and unresolved rollout owner questions stay review-only.",
      ],
      releaseFeedbackQueue: [
        "Release feedback queue: release owner notes, documentation concerns, release note concerns, handoff issues, and final safety questions require explicit operator approval.",
      ],
      severityPriorityChecklist: [
        "Severity priority checklist: mark safety impact, user impact, rollout risk, release risk, evidence quality, owner, and next review route before acting outside this page.",
      ],
      deniedTriageActions: [
        "Denied triage actions: auto-ingest feedback, mutate memory, apply changes, write files, approve actions, execute rollout, run tests, call providers, call connectors, create automations, or store outputs.",
      ],
      unresolvedTriageBlockers: [
        "Unresolved triage blockers: missing feedback owner, unclear severity, unresolved safety concern, stale rollout note, and missing release owner approval.",
      ],
      regressionReviewRoute: "Regression review route: /daily-beta-1-regression-review reviews regression concerns without running tests.",
      hardeningPassRoute: "Hardening pass route: /daily-beta-1-hardening-pass reviews hardening needs without applying changes.",
      nextRecommendedAction: "Next recommended action: keep Daily Beta 1 feedback triage blocked until usability, safety, rollout, release, severity, and priority owners approve decisions outside this page.",
      advancedDailyBetaOneFeedbackTriageReviewDetails: "Advanced triage details: Daily Beta 1 feedback triage review is review-only. Daily Beta 1 feedback triage review does not auto-ingest feedback, triage decisions require explicit operator approval, and unsafe triage shortcuts stay blocked. It does not ingest feedback, mutate memory, apply changes, execute workflows, run tests, call providers, call local models, call connectors, create automations, store outputs, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaOneFeedbackTriageReviewBoundary(): DailyBetaOneFeedbackTriageReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, actionExecutionAllowedFromUi: false, workflowExecutionAllowedFromUi: false, dailyBetaOneLaunchAllowedFromUi: false, rolloutExecutionAllowedFromUi: false, goLiveAllowedFromUi: false, approvalAutomationAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, releaseSignoffAutomationAllowedFromUi: false, finalSafetySignoffAutomationAllowedFromUi: false, regressionTestExecutionAllowedFromUi: false, documentationPublishAllowedFromUi: false, releaseNotesPublishAllowedFromUi: false, handoffSendAllowedFromUi: false, feedbackIngestionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, localBridgeEndpointCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaOneFeedbackTriageReview(model: Pick<DailyBetaOneFeedbackTriageReviewModel, "triageReviews">): string {
  return "Daily Beta 1 feedback triage review organizes " + model.triageReviews.length + " feedback triage posture. Daily Beta 1 feedback triage review does not auto-ingest feedback, triage decisions require explicit operator approval, and unsafe triage shortcuts stay blocked.";
}

export function buildDailyBetaOneFeedbackTriageReviewModel(): DailyBetaOneFeedbackTriageReviewModel {
  const triageReviews = buildDailyBetaOneFeedbackTriageReviews();
  const model: DailyBetaOneFeedbackTriageReviewModel = {
    title: "Daily Beta 1 feedback triage review",
    summary: "",
    triageReviews,
    boundary: buildDailyBetaOneFeedbackTriageReviewBoundary(),
    language: [...DAILY_BETA_ONE_FEEDBACK_TRIAGE_REVIEW_LANGUAGE],
    advancedDetails: [
      "Daily Beta 1 feedback triage review",
      "Daily Beta 1 feedback triage identity",
      "Triage groups",
      "Usability feedback queue",
      "Safety feedback queue",
      "Rollout feedback queue",
      "Release feedback queue",
      "Severity priority checklist",
      "Denied triage actions",
      "Unresolved triage blockers",
      "Regression review route",
      "Hardening pass route",
      "Next recommended action",
      "Daily Beta 1 feedback triage review does not auto-ingest feedback",
      "Triage decisions require explicit operator approval",
      "Unsafe triage shortcuts stay blocked",
      "Triage groups",
      "Severity priority checklist",
      "advanced triage details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaOneFeedbackTriageReview(model) };
}
