import type {
  RealDailyWorkflowResultReview,
  RealDailyWorkflowResultReviewBoundary,
  RealDailyWorkflowResultReviewModel,
} from "./real-daily-workflow-result-review-types";
import { buildRealDailyWorkflowResultReviewStableKey } from "./real-daily-workflow-result-review-types";

export const REAL_DAILY_WORKFLOW_RESULT_REVIEW_LANGUAGE = [
  "Real daily workflow result review",
  "Real daily workflow result review does not store live outputs",
  "Real daily workflow results require operator review before use",
  "Unsafe workflow results remain blocked",
  "Result review groups",
  "Acceptance checklist",
] as const;

export function buildRealDailyWorkflowResultReview(
  input: Omit<RealDailyWorkflowResultReview, "id"> & { idHint: string }
): RealDailyWorkflowResultReview {
  const { idHint, ...review } = input;
  return {
    id: buildRealDailyWorkflowResultReviewStableKey("real-daily-workflow-result-review", idHint, input.status),
    ...review,
  };
}

export function buildRealDailyWorkflowResultReviews(): RealDailyWorkflowResultReview[] {
  return [
    buildRealDailyWorkflowResultReview({
      idHint: "accept-reject-reuse-review",
      status: "blocked",
      realDailyWorkflowResultIdentity:
        "Real daily workflow result identity: real-daily-workflow-result-review-accept-reject-reuse-review.",
      resultReviewGroups: [
        "Result review groups: acceptance, rejection, reuse, safety, evidence link, recovery handoff, hardening handoff, and operator decision.",
      ],
      acceptanceChecklist: [
        "Acceptance checklist: result has reviewed scope match, evidence support, privacy check, approval gate, and recovery note before any separate use.",
      ],
      rejectionChecklist: [
        "Rejection checklist: unsafe, unsupported, stale, private, incomplete, or out-of-scope workflow results remain blocked.",
      ],
      reuseChecklist: [
        "Reuse checklist: reuse requires operator review, source evidence, exact scope, retention decision, and no automatic memory promotion.",
      ],
      safetyReviewChecklist: [
        "Safety review checklist: provider/local/connector outputs stay summarized and are not stored as live outputs from this page.",
      ],
      deniedResultActions: [
        "Denied result actions: store live outputs, ingest results, accept results automatically, reuse outputs automatically, mutate memory, mutate files, trigger recovery, apply hardening, or send result data without approval.",
      ],
      blockedResultRisks: [
        "Blocked result risks: missing evidence, unsafe output, privacy concern, unclear reuse scope, rejected result path, and missing recovery handoff.",
      ],
      realDailyWorkflowRecoveryReviewRoute:
        "Real daily workflow recovery review route: /real-daily-workflow-recovery-review reviews recovery options without triggering recovery.",
      realDailyWorkflowHardeningPassRoute:
        "Real daily workflow hardening pass route: /real-daily-workflow-hardening-pass reviews hardening without applying changes.",
      nextRecommendedAction:
        "Next recommended action: keep workflow results blocked until acceptance, rejection, reuse, and safety review are complete.",
      advancedResultDetails:
        "Advanced result details: real daily workflow result review is review-only. Real daily workflow result review does not store live outputs, real daily workflow results require operator review before use, and unsafe workflow results remain blocked. It does not ingest results, store outputs, trigger recovery, apply hardening, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildRealDailyWorkflowResultReviewBoundary(): RealDailyWorkflowResultReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    realDailyWorkflowResultReviewDoesNotStoreLiveOutputs: true,
    realDailyWorkflowResultsRequireOperatorReviewBeforeUse: true,
    unsafeWorkflowResultsRemainBlocked: true,
    outputStorageAllowed: false,
    resultIngestionAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    recoveryTriggerAllowedFromUi: false,
    hardeningApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeRealDailyWorkflowResultReview(
  model: Pick<RealDailyWorkflowResultReviewModel, "reviews">
): string {
  return `Real daily workflow result review summarizes ${model.reviews.length} result posture without storing live outputs. Results require operator review before use, and unsafe workflow results remain blocked.`;
}

export function buildRealDailyWorkflowResultReviewModel(): RealDailyWorkflowResultReviewModel {
  const reviews = buildRealDailyWorkflowResultReviews();
  const model: RealDailyWorkflowResultReviewModel = {
    title: "Real daily workflow result review",
    summary: "",
    reviews,
    boundary: buildRealDailyWorkflowResultReviewBoundary(),
    resultLanguage: [...REAL_DAILY_WORKFLOW_RESULT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Real daily workflow result review",
      "Real daily workflow result identity",
      "Result review groups",
      "Acceptance checklist",
      "Rejection checklist",
      "Reuse checklist",
      "Safety review checklist",
      "Denied result actions",
      "Blocked result risks",
      "Real daily workflow recovery review route",
      "Real daily workflow hardening pass route",
      "Next recommended action",
      "Real daily workflow result review does not store live outputs",
      "Real daily workflow results require operator review before use",
      "Unsafe workflow results remain blocked",
      "advanced result details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeRealDailyWorkflowResultReview(model) };
}
