import type {
  BetaTwoOperatorFeedbackReview,
  BetaTwoOperatorFeedbackReviewBoundary,
  BetaTwoOperatorFeedbackReviewModel,
} from "./beta-2-operator-feedback-review-types";
import { buildBetaTwoOperatorFeedbackReviewStableKey } from "./beta-2-operator-feedback-review-types";

export const BETA_TWO_OPERATOR_FEEDBACK_REVIEW_LANGUAGE = [
  "Beta 2 operator feedback review",
  "Beta 2 operator feedback review does not auto-ingest feedback",
  "Beta 2 feedback requires operator review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Feedback groups",
  "Release feedback checklist",
] as const;

export function buildBetaTwoOperatorFeedbackReview(
  input: Omit<BetaTwoOperatorFeedbackReview, "id"> & { idHint: string }
): BetaTwoOperatorFeedbackReview {
  const { idHint, ...review } = input;
  return {
    id: buildBetaTwoOperatorFeedbackReviewStableKey("beta-2-operator-feedback-review", idHint, input.status),
    ...review,
  };
}

export function buildBetaTwoOperatorFeedbackReviews(): BetaTwoOperatorFeedbackReview[] {
  return [
    buildBetaTwoOperatorFeedbackReview({
      idHint: "review-only-feedback-gate",
      status: "blocked",
      betaTwoFeedbackIdentity:
        "Beta 2 feedback identity: beta-2-operator-feedback-review-review-only-feedback-gate.",
      feedbackGroups: [
        "Feedback groups: usability feedback, safety feedback, release feedback, controlled trial notes, hardening handoff, and blocked shortcut risks.",
      ],
      usabilityFeedbackChecklist: [
        "Usability feedback checklist: feedback is reviewed before use, raw notes stay secondary, and no feedback is stored or promoted automatically.",
      ],
      safetyFeedbackChecklist: [
        "Safety feedback checklist: unsafe feedback shortcuts stay blocked, and feedback cannot approve actions, mutate memory, or trigger hardening automatically.",
      ],
      releaseFeedbackChecklist: [
        "Release feedback checklist: release feedback remains advisory until an operator explicitly reviews and approves it outside this page.",
      ],
      deniedFeedbackActions: [
        "Denied feedback actions: ingest feedback, mutate memory, write files, store outputs, approve release, execute workflows, or create automations.",
      ],
      blockedFeedbackRisks: [
        "Blocked feedback risks: unsafe feedback shortcuts stay blocked until explicit operator review resolves them outside this page.",
      ],
      betaTwoHardeningRoute:
        "Beta 2 hardening route: /beta-2-hardening-pass summarizes hardening needs without applying changes.",
      releaseCandidateRoute:
        "Release candidate route: /codexforge-beta-2-release-candidate returns to Beta 2 readiness without going live.",
      nextRecommendedAction:
        "Next recommended action: keep feedback review-only, triage safety-sensitive feedback manually, and route approved findings to hardening review.",
      advancedFeedbackDetails:
        "Advanced feedback details: Beta 2 operator feedback review is review-only. Beta 2 operator feedback review does not auto-ingest feedback, Beta 2 feedback requires operator review before use, and unsafe feedback shortcuts stay blocked. It does not mutate memory, write files, store outputs, approve release, execute workflows, call providers, call local models, call connectors, or create automations.",
    }),
  ];
}

export function buildBetaTwoOperatorFeedbackReviewBoundary(): BetaTwoOperatorFeedbackReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    betaTwoOperatorFeedbackReviewDoesNotAutoIngestFeedback: true,
    betaTwoFeedbackRequiresOperatorReviewBeforeUse: true,
    unsafeFeedbackShortcutsStayBlocked: true,
    actionsExecutedFromUi: false,
    feedbackIngestionAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
  };
}

export function summarizeBetaTwoOperatorFeedbackReview(
  model: Pick<BetaTwoOperatorFeedbackReviewModel, "reviews">
): string {
  return `Beta 2 operator feedback review checks ${model.reviews.length} feedback posture without auto-ingesting feedback. Beta 2 feedback requires operator review before use, and unsafe feedback shortcuts stay blocked.`;
}

export function buildBetaTwoOperatorFeedbackReviewModel(): BetaTwoOperatorFeedbackReviewModel {
  const reviews = buildBetaTwoOperatorFeedbackReviews();
  const model: BetaTwoOperatorFeedbackReviewModel = {
    title: "Beta 2 operator feedback review",
    summary: "",
    reviews,
    boundary: buildBetaTwoOperatorFeedbackReviewBoundary(),
    feedbackLanguage: [...BETA_TWO_OPERATOR_FEEDBACK_REVIEW_LANGUAGE],
    advancedDetails: [
      "Beta 2 operator feedback review",
      "Beta 2 feedback identity",
      "Feedback groups",
      "usability feedback checklist",
      "safety feedback checklist",
      "Release feedback checklist",
      "denied feedback actions",
      "blocked feedback risks",
      "Beta 2 hardening route",
      "release candidate route",
      "next recommended action",
      "Beta 2 operator feedback review does not auto-ingest feedback",
      "Beta 2 feedback requires operator review before use",
      "Unsafe feedback shortcuts stay blocked",
      "advanced feedback details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaTwoOperatorFeedbackReview(model) };
}
