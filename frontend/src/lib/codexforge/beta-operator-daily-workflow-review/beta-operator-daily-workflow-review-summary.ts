import type {
  BetaOperatorDailyWorkflowReview,
  BetaOperatorDailyWorkflowReviewBoundary,
  BetaOperatorDailyWorkflowReviewModel,
} from "./beta-operator-daily-workflow-review-types";
import { buildBetaOperatorDailyWorkflowReviewStableKey } from "./beta-operator-daily-workflow-review-types";

export const BETA_OPERATOR_DAILY_WORKFLOW_REVIEW_LANGUAGE = [
  "Beta operator daily workflow review",
  "Beta operator daily workflow review does not auto-ingest feedback",
  "Beta workflow feedback requires operator review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Review groups",
  "Usability checklist",
] as const;

export function buildBetaOperatorDailyWorkflowReview(
  input: Omit<BetaOperatorDailyWorkflowReview, "id"> & { idHint: string }
): BetaOperatorDailyWorkflowReview {
  const { idHint, ...review } = input;
  return {
    id: buildBetaOperatorDailyWorkflowReviewStableKey("beta-operator-daily-workflow-review", idHint, input.status),
    ...review,
  };
}

export function buildBetaOperatorDailyWorkflowReviews(): BetaOperatorDailyWorkflowReview[] {
  return [
    buildBetaOperatorDailyWorkflowReview({
      idHint: "review-only-feedback",
      status: "ready-for-review",
      betaWorkflowReviewIdentity:
        "Beta workflow review identity: beta-operator-daily-workflow-review-review-only-feedback.",
      reviewGroups: [
        "Review groups: novice clarity, safety copy, operator confidence, daily route sequence, result-review friction, recovery clarity, and release-candidate readiness.",
        "Review groups: feedback is visible as review guidance only and is not auto-ingested.",
      ],
      usabilityChecklist: [
        "Usability checklist: plain-English labels, obvious next action, concise safety copy, no duplicate menus, no raw JSON above the fold, and clear route handoff language.",
      ],
      safetyClarityChecklist: [
        "Safety clarity checklist: review-only, approval required, no action execution, no workflow execution, no provider/local/connector calls, no automation creation, no file mutation, and no memory mutation.",
      ],
      feedbackReviewChecklist: [
        "Feedback review checklist: beta workflow feedback requires operator review before use, private details stay redacted, and unsafe feedback shortcuts stay blocked.",
      ],
      deniedFeedbackActions: [
        "Denied feedback actions: auto-ingest feedback, mutate memory, write files, create issues, create tasks, create automations, send feedback to providers/models/connectors, or persist feedback as memory automatically.",
      ],
      blockedReviewRisks: [
        "Blocked review risks: unsafe feedback shortcuts stay blocked, unclear usability feedback stays blocked, private feedback stays redacted, and memory promotion stays blocked.",
      ],
      frictionPatchRoute:
        "Friction patch route: /beta-operator-workflow-friction-patch proposes usability patches without applying them.",
      releaseCandidateRoute:
        "Release candidate route: /beta-operator-workflow-release-candidate summarizes readiness without going live.",
      nextRecommendedAction:
        "Next recommended action: review feedback manually, mark unsafe shortcuts as blocked, and send only approved usability findings to the friction patch review.",
      advancedWorkflowReviewDetails:
        "Advanced workflow review details: beta operator daily workflow review is review-only. Beta operator daily workflow review does not auto-ingest feedback, beta workflow feedback requires operator review before use, and unsafe feedback shortcuts stay blocked. It does not ingest feedback, fetch external feedback, mutate memory, write files, create issues, create tickets, create tasks, create automations, execute workflows, call providers, send prompts, call local models, call local bridge endpoints, call connectors, send connector data, store outputs, apply patches, run tests, run builds, run smoke checks, run shell commands, run git commands, promote memory, mutate Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create MCP runtimes, store credentials, print process.env, display secrets, remove route coverage, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildBetaOperatorDailyWorkflowReview({
      idHint: "blocked-unsafe-feedback-shortcut",
      status: "blocked",
      betaWorkflowReviewIdentity:
        "Beta workflow review identity: beta-operator-daily-workflow-review-blocked-unsafe-feedback-shortcut.",
      reviewGroups: [
        "Review groups: blocked because feedback asks for automatic ingestion or automatic action.",
      ],
      usabilityChecklist: [
        "Usability checklist: blocked until feedback is safe and reviewable.",
      ],
      safetyClarityChecklist: [
        "Safety clarity checklist: blocked because unsafe feedback shortcuts stay blocked.",
      ],
      feedbackReviewChecklist: [
        "Feedback review checklist: blocked because beta workflow feedback requires operator review before use.",
      ],
      deniedFeedbackActions: [
        "Denied feedback actions: no feedback ingestion, no memory mutation, no file write, and no task or issue creation.",
      ],
      blockedReviewRisks: [
        "Blocked review risks: unsafe feedback shortcuts stay blocked.",
      ],
      frictionPatchRoute:
        "Friction patch route: /beta-operator-workflow-friction-patch remains review-only.",
      releaseCandidateRoute:
        "Release candidate route: /beta-operator-workflow-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep feedback blocked until an operator reviews it manually.",
      advancedWorkflowReviewDetails:
        "Advanced workflow review details: blocked feedback cannot be ingested, persisted, promoted, or used automatically from this page.",
    }),
  ];
}

export function buildBetaOperatorDailyWorkflowReviewBoundary(): BetaOperatorDailyWorkflowReviewBoundary {
  return {
    betaOperatorDailyWorkflowReviewOnly: true,
    betaOperatorDailyWorkflowReviewDoesNotAutoIngestFeedback: true,
    betaWorkflowFeedbackRequiresOperatorReviewBeforeUse: true,
    unsafeFeedbackShortcutsStayBlocked: true,
    feedbackIngestionAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    approvalDecisionPersistenceAllowedFromUi: false,
  };
}

export function summarizeBetaOperatorDailyWorkflowReview(
  model: Pick<BetaOperatorDailyWorkflowReviewModel, "reviews">
): string {
  return `Beta operator daily workflow review checks ${model.reviews.length} review posture(s) without auto-ingesting feedback. Beta operator daily workflow review does not auto-ingest feedback, beta workflow feedback requires operator review before use, and unsafe feedback shortcuts stay blocked.`;
}

export function buildBetaOperatorDailyWorkflowReviewModel(): BetaOperatorDailyWorkflowReviewModel {
  const reviews = buildBetaOperatorDailyWorkflowReviews();
  const model: BetaOperatorDailyWorkflowReviewModel = {
    title: "Beta operator daily workflow review",
    summary: "",
    reviews,
    boundary: buildBetaOperatorDailyWorkflowReviewBoundary(),
    reviewLanguage: [...BETA_OPERATOR_DAILY_WORKFLOW_REVIEW_LANGUAGE],
    advancedDetails: [
      "Beta operator daily workflow review",
      "beta workflow review identity",
      "Review groups",
      "Usability checklist",
      "safety clarity checklist",
      "feedback review checklist",
      "denied feedback actions",
      "blocked review risks",
      "friction patch route",
      "release candidate route",
      "next recommended action",
      "Beta operator daily workflow review does not auto-ingest feedback",
      "Beta workflow feedback requires operator review before use",
      "Unsafe feedback shortcuts stay blocked",
      "advanced workflow review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaOperatorDailyWorkflowReview(model) };
}
