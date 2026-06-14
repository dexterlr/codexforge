import type {
  MultiWorkflowRegressionReview,
  MultiWorkflowRegressionReviewBoundary,
  MultiWorkflowRegressionReviewModel,
} from "./multi-workflow-regression-review-types";
import { buildMultiWorkflowRegressionReviewStableKey } from "./multi-workflow-regression-review-types";

export const MULTI_WORKFLOW_REGRESSION_REVIEW_LANGUAGE = [
  "Multi-workflow regression review",
  "Multi-workflow regression review does not run tests",
  "Regression fixes require explicit operator approval",
  "Unresolved regressions stay blocked",
  "Regression groups",
  "Workflow coverage checklist",
] as const;

export function buildMultiWorkflowRegressionReview(
  input: Omit<MultiWorkflowRegressionReview, "id"> & { idHint: string }
): MultiWorkflowRegressionReview {
  const { idHint, ...review } = input;
  return {
    id: buildMultiWorkflowRegressionReviewStableKey("multi-workflow-regression-review", idHint, input.status),
    ...review,
  };
}

export function buildMultiWorkflowRegressionReviews(): MultiWorkflowRegressionReview[] {
  return [
    buildMultiWorkflowRegressionReview({
      idHint: "cross-workflow-regression-review",
      status: "blocked",
      multiWorkflowRegressionIdentity:
        "Multi-workflow regression identity: multi-workflow-regression-review-cross-workflow-regression-review.",
      regressionGroups: [
        "Regression groups: planning regressions, trial review regressions, evidence review regressions, result review regressions, recovery review regressions, and release readiness regressions.",
      ],
      workflowCoverageChecklist: [
        "Workflow coverage checklist: every planned workflow needs route coverage, owner coverage, safety copy, approval copy, evidence handoff, result review, and recovery review.",
      ],
      approvalEvidenceResultRecoveryRegressionChecklist: [
        "Approval/evidence/result/recovery regression checklist: approval gates, evidence source quality, result acceptance, unsafe output handling, and recovery ownership must stay intact.",
      ],
      providerLocalConnectorAutomationRegressionChecklist: [
        "Provider/local/connector/automation regression checklist: provider, local model, connector, and automation lanes stay blocked from UI execution and live traffic routing.",
      ],
      deniedRegressionActions: [
        "Denied regression actions: run tests, execute workflows, apply fixes, apply patches, call providers, call local models, call connectors, create automations, write files, or persist settings.",
      ],
      unresolvedRegressionBlockers: [
        "Unresolved regression blockers: missing workflow coverage, unresolved approval gaps, evidence ambiguity, unsafe result reuse, incomplete recovery review, and release blocker drift.",
      ],
      multiWorkflowReleaseCandidateRoute:
        "Multi-workflow release candidate route: /multi-workflow-release-candidate summarizes readiness without approving release.",
      controlledLiveSignoffRoute:
        "Controlled live signoff route: /controlled-live-capability-signoff reviews live readiness without automatic signoff.",
      nextRecommendedAction:
        "Next recommended action: keep regressions blocked until regression owners review coverage and approve any fixes outside this page.",
      advancedRegressionDetails:
        "Advanced regression details: multi-workflow regression review is review-only. Multi-workflow regression review does not run tests, regression fixes require explicit operator approval, and unresolved regressions stay blocked. It does not run tests, execute workflows, apply fixes, apply patches, call providers, call local models, call connectors, create automations, mutate files, persist settings, or create an MCP runtime.",
    }),
  ];
}

export function buildMultiWorkflowRegressionReviewBoundary(): MultiWorkflowRegressionReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    multiWorkflowRegressionReviewDoesNotRunTests: true,
    regressionFixesRequireExplicitOperatorApproval: true,
    unresolvedRegressionsStayBlocked: true,
    testExecutionFromUiAllowed: false,
    workflowExecutionAllowedFromUi: false,
    fixApplicationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
  };
}

export function summarizeMultiWorkflowRegressionReview(
  model: Pick<MultiWorkflowRegressionReviewModel, "reviews">
): string {
  return `Multi-workflow regression review covers ${model.reviews.length} regression posture without running tests. Regression fixes require explicit operator approval, and unresolved regressions stay blocked.`;
}

export function buildMultiWorkflowRegressionReviewModel(): MultiWorkflowRegressionReviewModel {
  const reviews = buildMultiWorkflowRegressionReviews();
  const model: MultiWorkflowRegressionReviewModel = {
    title: "Multi-workflow regression review",
    summary: "",
    reviews,
    boundary: buildMultiWorkflowRegressionReviewBoundary(),
    regressionLanguage: [...MULTI_WORKFLOW_REGRESSION_REVIEW_LANGUAGE],
    advancedDetails: [
      "Multi-workflow regression review",
      "Multi-workflow regression identity",
      "Regression groups",
      "Workflow coverage checklist",
      "Approval/evidence/result/recovery regression checklist",
      "Provider/local/connector/automation regression checklist",
      "Denied regression actions",
      "Unresolved regression blockers",
      "Multi-workflow release candidate route",
      "Controlled live signoff route",
      "Next recommended action",
      "Multi-workflow regression review does not run tests",
      "Regression fixes require explicit operator approval",
      "Unresolved regressions stay blocked",
      "advanced regression details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeMultiWorkflowRegressionReview(model) };
}
