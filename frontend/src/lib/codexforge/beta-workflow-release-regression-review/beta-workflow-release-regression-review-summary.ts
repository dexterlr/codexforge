import type {
  BetaWorkflowReleaseRegressionReview,
  BetaWorkflowReleaseRegressionReviewBoundary,
  BetaWorkflowReleaseRegressionReviewModel,
} from "./beta-workflow-release-regression-review-types";
import { buildBetaWorkflowReleaseRegressionReviewStableKey } from "./beta-workflow-release-regression-review-types";

export const BETA_WORKFLOW_RELEASE_REGRESSION_REVIEW_LANGUAGE = [
  "Beta workflow release regression review",
  "Beta workflow release regression review does not run tests",
  "Regression fixes require explicit operator approval",
  "Unresolved beta regressions stay blocked",
  "Regression groups",
  "Provider local connector automation coverage checklist",
] as const;

export function buildBetaWorkflowReleaseRegressionReview(
  input: Omit<BetaWorkflowReleaseRegressionReview, "id"> & { idHint: string }
): BetaWorkflowReleaseRegressionReview {
  const { idHint, ...review } = input;
  return {
    id: buildBetaWorkflowReleaseRegressionReviewStableKey(
      "beta-workflow-release-regression-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildBetaWorkflowReleaseRegressionReviews(): BetaWorkflowReleaseRegressionReview[] {
  return [
    buildBetaWorkflowReleaseRegressionReview({
      idHint: "review-only-regression-gate",
      status: "blocked",
      betaWorkflowRegressionIdentity:
        "Beta workflow regression identity: beta-workflow-release-regression-review-review-only-regression-gate.",
      regressionGroups: [
        "Regression groups: release candidate routing, safety copy, provider/local/connector/automation boundaries, beta workflow route coverage, and blocked action copy.",
      ],
      providerLocalConnectorAutomationCoverageChecklist: [
        "Provider local connector automation coverage checklist: no provider calls, no local model calls, no connector API calls, no connector data fetch, no automation creation, and no live traffic routing.",
      ],
      betaWorkflowRouteCoverageChecklist: [
        "Beta workflow route coverage checklist: beta operator workflow release candidate, regression review, safety signoff review, documentation review, onboarding final pass, Beta 2 release candidate, controlled trial, feedback review, and hardening stay routed.",
      ],
      safetyRegressionChecklist: [
        "Safety regression checklist: review-only, approval required, no tests run from UI, no workflow execution, no file mutation, no memory mutation, and no release approval automation.",
      ],
      deniedRegressionActions: [
        "Denied regression actions: run tests, execute workflows, apply patches, write files, call providers, call local models, call connectors, create automations, approve release, or mutate memory.",
      ],
      unresolvedRegressionRisks: [
        "Unresolved regression risks: unresolved beta regressions stay blocked until the operator reviews and approves a fix outside this page.",
      ],
      safetySignoffRoute:
        "Safety signoff route: /beta-workflow-safety-signoff-review reviews signoff without approving release automatically.",
      documentationReviewRoute:
        "Documentation review route: /beta-workflow-documentation-review checks documentation readiness without publishing documentation automatically.",
      nextRecommendedAction:
        "Next recommended action: keep release regressions blocked, review the safety signoff, and require explicit operator approval before any regression fix.",
      advancedRegressionReviewDetails:
        "Advanced regression review details: Beta workflow release regression review is review-only. Beta workflow release regression review does not run tests, regression fixes require explicit operator approval, and unresolved beta regressions stay blocked. It does not execute workflows, run regression tests, approve release, call providers, call local models, call connectors, create automations, mutate files, mutate memory, persist outputs, or promote feedback automatically.",
    }),
  ];
}

export function buildBetaWorkflowReleaseRegressionReviewBoundary(): BetaWorkflowReleaseRegressionReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    betaWorkflowReleaseRegressionReviewDoesNotRunTests: true,
    regressionFixesRequireExplicitOperatorApproval: true,
    unresolvedBetaRegressionsStayBlocked: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    regressionTestExecutionAllowedFromUi: false,
    releaseApprovalAutomationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeBetaWorkflowReleaseRegressionReview(
  model: Pick<BetaWorkflowReleaseRegressionReviewModel, "reviews">
): string {
  return `Beta workflow release regression review checks ${model.reviews.length} regression posture without running tests. Beta workflow release regression review does not run tests, regression fixes require explicit operator approval, and unresolved beta regressions stay blocked.`;
}

export function buildBetaWorkflowReleaseRegressionReviewModel(): BetaWorkflowReleaseRegressionReviewModel {
  const reviews = buildBetaWorkflowReleaseRegressionReviews();
  const model: BetaWorkflowReleaseRegressionReviewModel = {
    title: "Beta workflow release regression review",
    summary: "",
    reviews,
    boundary: buildBetaWorkflowReleaseRegressionReviewBoundary(),
    reviewLanguage: [...BETA_WORKFLOW_RELEASE_REGRESSION_REVIEW_LANGUAGE],
    advancedDetails: [
      "Beta workflow release regression review",
      "beta workflow regression identity",
      "Regression groups",
      "Provider local connector automation coverage checklist",
      "beta workflow route coverage checklist",
      "safety regression checklist",
      "denied regression actions",
      "unresolved regression risks",
      "safety signoff route",
      "documentation review route",
      "next recommended action",
      "Beta workflow release regression review does not run tests",
      "Regression fixes require explicit operator approval",
      "Unresolved beta regressions stay blocked",
      "advanced regression review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaWorkflowReleaseRegressionReview(model) };
}
