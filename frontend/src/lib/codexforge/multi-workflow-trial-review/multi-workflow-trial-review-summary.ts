import type {
  MultiWorkflowTrialReview,
  MultiWorkflowTrialReviewBoundary,
  MultiWorkflowTrialReviewModel,
} from "./multi-workflow-trial-review-types";
import { buildMultiWorkflowTrialReviewStableKey } from "./multi-workflow-trial-review-types";

export const MULTI_WORKFLOW_TRIAL_REVIEW_LANGUAGE = [
  "Multi-workflow trial review",
  "Multi-workflow trial review does not launch trials",
  "Trial actions require explicit operator approval",
  "Unresolved trial blockers stay blocked",
  "Trial comparison groups",
  "Evidence result recovery review checklist",
] as const;

export function buildMultiWorkflowTrialReview(
  input: Omit<MultiWorkflowTrialReview, "id"> & { idHint: string }
): MultiWorkflowTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildMultiWorkflowTrialReviewStableKey("multi-workflow-trial-review", idHint, input.status),
    ...review,
  };
}

export function buildMultiWorkflowTrialReviews(): MultiWorkflowTrialReview[] {
  return [
    buildMultiWorkflowTrialReview({
      idHint: "candidate-comparison-review",
      status: "blocked",
      multiWorkflowTrialReviewIdentity:
        "Multi-workflow trial review identity: multi-workflow-trial-review-candidate-comparison-review.",
      trialComparisonGroups: [
        "Trial comparison groups: daily operator workflow, provider draft workflow, local model draft workflow, connector evidence workflow, automation handoff workflow, and recovery workflow.",
      ],
      operatorReadinessChecklist: [
        "Operator readiness checklist: each candidate needs a named owner, approved scope, privacy review, expected outcome, and manual stop condition before any separate trial.",
      ],
      approvalSafetyChecklist: [
        "Approval/safety checklist: trial actions require exact operator approval, bounded lane, evidence capture owner, result review owner, and recovery route.",
      ],
      evidenceResultRecoveryReviewChecklist: [
        "Evidence result recovery review checklist: evidence quality, result acceptance, unsafe output handling, rollback owner, and recovery escalation stay visible.",
      ],
      deniedTrialActions: [
        "Denied trial actions: launch trials, execute workflows, persist trial results, call providers, call local models, call connectors, create automations, write files, or mutate memory.",
      ],
      unresolvedTrialBlockers: [
        "Unresolved trial blockers: missing operator owner, unclear approval scope, incomplete evidence route, missing regression review, and unsafe result reuse.",
      ],
      multiWorkflowRegressionRoute:
        "Multi-workflow regression route: /multi-workflow-regression-review reviews cross-workflow regressions without running tests.",
      multiWorkflowReleaseCandidateRoute:
        "Multi-workflow release candidate route: /multi-workflow-release-candidate summarizes readiness without release approval.",
      nextRecommendedAction:
        "Next recommended action: keep trial actions blocked until comparison groups, approval gates, and recovery ownership are reviewed outside this page.",
      advancedTrialDetails:
        "Advanced trial details: multi-workflow trial review is review-only. Multi-workflow trial review does not launch trials, trial actions require explicit operator approval, and unresolved trial blockers stay blocked. It does not execute workflows, persist trial results, call providers, call local models, call connectors, create automations, write files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildMultiWorkflowTrialReviewBoundary(): MultiWorkflowTrialReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    multiWorkflowTrialReviewDoesNotLaunchTrials: true,
    trialActionsRequireExplicitOperatorApproval: true,
    unresolvedTrialBlockersStayBlocked: true,
    trialLaunchAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    trialResultPersistenceAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeMultiWorkflowTrialReview(model: Pick<MultiWorkflowTrialReviewModel, "reviews">): string {
  return `Multi-workflow trial review compares ${model.reviews.length} trial posture without launching trials. Trial actions require explicit operator approval, and unresolved trial blockers stay blocked.`;
}

export function buildMultiWorkflowTrialReviewModel(): MultiWorkflowTrialReviewModel {
  const reviews = buildMultiWorkflowTrialReviews();
  const model: MultiWorkflowTrialReviewModel = {
    title: "Multi-workflow trial review",
    summary: "",
    reviews,
    boundary: buildMultiWorkflowTrialReviewBoundary(),
    trialLanguage: [...MULTI_WORKFLOW_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Multi-workflow trial review",
      "Multi-workflow trial review identity",
      "Trial comparison groups",
      "Operator readiness checklist",
      "Approval/safety checklist",
      "Evidence result recovery review checklist",
      "Denied trial actions",
      "Unresolved trial blockers",
      "Multi-workflow regression route",
      "Multi-workflow release candidate route",
      "Next recommended action",
      "Multi-workflow trial review does not launch trials",
      "Trial actions require explicit operator approval",
      "Unresolved trial blockers stay blocked",
      "advanced trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeMultiWorkflowTrialReview(model) };
}
