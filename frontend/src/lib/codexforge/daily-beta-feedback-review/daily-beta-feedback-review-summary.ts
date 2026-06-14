import type {
  DailyBetaFeedbackReview,
  DailyBetaFeedbackReviewBoundary,
  DailyBetaFeedbackReviewModel,
} from "./daily-beta-feedback-review-types";
import { buildDailyBetaFeedbackReviewStableKey } from "./daily-beta-feedback-review-types";

export const DAILY_BETA_FEEDBACK_REVIEW_LANGUAGE = [
  "Daily Beta feedback review",
  "Daily Beta feedback review does not auto-ingest feedback",
  "Daily Beta feedback requires operator review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Feedback groups",
  "Release feedback checklist",
] as const;

export function buildDailyBetaFeedbackReview(
  input: Omit<DailyBetaFeedbackReview, "id"> & { idHint: string }
): DailyBetaFeedbackReview {
  const { idHint, ...review } = input;
  return {
    id: buildDailyBetaFeedbackReviewStableKey("daily-beta-feedback-review", idHint, input.status),
    ...review,
  };
}

export function buildDailyBetaFeedbackReviews(): DailyBetaFeedbackReview[] {
  return [
    buildDailyBetaFeedbackReview({
      idHint: "operator-feedback-review",
      status: "blocked",
      dailyBetaFeedbackReviewIdentity:
        "Daily Beta feedback review identity: daily-beta-feedback-review-operator-feedback-review.",
      feedbackGroups: [
        "Feedback groups: usability feedback, safety feedback, release feedback, operator confidence feedback, evidence clarity feedback, and recovery clarity feedback.",
      ],
      usabilityFeedbackChecklist: [
        "Usability feedback checklist: navigation clarity, plain-English labels, blocker visibility, next action clarity, and novice-friendly review language must be reviewed before use.",
      ],
      safetyFeedbackChecklist: [
        "Safety feedback checklist: feedback must not bypass approval, request live execution, store secrets, store outputs, mutate files, mutate memory, or promote unsafe shortcuts.",
      ],
      releaseFeedbackChecklist: [
        "Release feedback checklist: Daily Beta release feedback needs operator review, safety review, release owner review, regression owner review, and hardening owner review.",
      ],
      deniedFeedbackActions: [
        "Denied feedback actions: auto-ingest feedback, mutate memory, write files, store outputs, approve release, go live, execute workflows, call providers, call connectors, or create automations.",
      ],
      unresolvedFeedbackBlockers: [
        "Unresolved feedback blockers: unsafe feedback shortcut, missing operator review, unclear privacy scope, unresolved release blocker, and missing hardening owner.",
      ],
      dailyBetaHardeningRoute:
        "Daily Beta hardening route: /beta-2-hardening-pass remains the existing hardening review surface until Daily Beta hardening is separately approved.",
      dailyBetaReleaseCandidateRoute:
        "Daily Beta release candidate route: /codexforge-daily-beta-release-candidate summarizes Daily Beta readiness without going live.",
      nextRecommendedAction:
        "Next recommended action: keep feedback blocked from use until operator review, safety review, release review, and hardening review happen outside this page.",
      advancedFeedbackDetails:
        "Advanced feedback details: Daily Beta feedback review is review-only. Daily Beta feedback review does not auto-ingest feedback, Daily Beta feedback requires operator review before use, and unsafe feedback shortcuts stay blocked. It does not ingest feedback, mutate memory, write files, store outputs, execute workflows, approve release, call providers, call connectors, create automations, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaFeedbackReviewBoundary(): DailyBetaFeedbackReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    dailyBetaFeedbackReviewDoesNotAutoIngestFeedback: true,
    dailyBetaFeedbackRequiresOperatorReviewBeforeUse: true,
    unsafeFeedbackShortcutsStayBlocked: true,
    feedbackIngestionAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    outputStorageAllowed: false,
  };
}

export function summarizeDailyBetaFeedbackReview(model: Pick<DailyBetaFeedbackReviewModel, "reviews">): string {
  return `Daily Beta feedback review reviews ${model.reviews.length} feedback posture without auto-ingesting feedback. Daily Beta feedback requires operator review before use, and unsafe feedback shortcuts stay blocked.`;
}

export function buildDailyBetaFeedbackReviewModel(): DailyBetaFeedbackReviewModel {
  const reviews = buildDailyBetaFeedbackReviews();
  const model: DailyBetaFeedbackReviewModel = {
    title: "Daily Beta feedback review",
    summary: "",
    reviews,
    boundary: buildDailyBetaFeedbackReviewBoundary(),
    feedbackLanguage: [...DAILY_BETA_FEEDBACK_REVIEW_LANGUAGE],
    advancedDetails: [
      "Daily Beta feedback review",
      "Daily Beta feedback review identity",
      "Feedback groups",
      "Usability feedback checklist",
      "Safety feedback checklist",
      "Release feedback checklist",
      "Denied feedback actions",
      "Unresolved feedback blockers",
      "Daily Beta hardening route",
      "Daily Beta release candidate route",
      "Next recommended action",
      "Daily Beta feedback review does not auto-ingest feedback",
      "Daily Beta feedback requires operator review before use",
      "Unsafe feedback shortcuts stay blocked",
      "advanced feedback details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaFeedbackReview(model) };
}
