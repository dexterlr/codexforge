import type { EndToEndRolloutRegressionReview, EndToEndRolloutRegressionReviewBoundary, EndToEndRolloutRegressionReviewModel } from "./end-to-end-rollout-regression-review-types";
import { buildEndToEndRolloutRegressionReviewStableKey } from "./end-to-end-rollout-regression-review-types";

export const END_TO_END_ROLLOUT_REGRESSION_REVIEW_LANGUAGE = [
  "End-to-end rollout regression review",
  "End-to-end rollout regression review does not run tests",
  "Rollout regression fixes require explicit operator approval",
  "Unresolved rollout regressions stay blocked",
  "Regression groups",
  "File test regression checklist",
] as const;

export function buildEndToEndRolloutRegressionReview(input: Omit<EndToEndRolloutRegressionReview, "id"> & { idHint: string }): EndToEndRolloutRegressionReview {
  const { idHint, ...review } = input;
  return { id: buildEndToEndRolloutRegressionReviewStableKey("end-to-end-rollout-regression-review", idHint, input.status), ...review };
}

export function buildEndToEndRolloutRegressionReviews(): EndToEndRolloutRegressionReview[] {
  return [
    buildEndToEndRolloutRegressionReview({
      idHint: "end-to-end-rollout-regression-review-packet",
      status: "blocked",
      rolloutRegressionReviewIdentity: "Rollout regression review identity: end-to-end-rollout-regression-review-packet.",
      regressionGroups: [
        "Regression groups: workflow regression, provider/local/connector/automation regression, file/test regression, feedback regression, hardening handoff, and final boundary signoff handoff.",
      ],
      workflowRegressionChecklist: [
        "Workflow regression checklist: plan, approval, evidence, result, recovery, hardening, release candidate, rollout plan, and rollout review paths remain blocked until reviewed.",
      ],
      providerLocalConnectorAutomationRegressionChecklist: [
        "Provider/local/connector/automation regression checklist: no provider calls, no local model calls, no connector calls, no connector data fetch, no automation creation, and no live traffic routing from UI.",
      ],
      fileTestRegressionChecklist: [
        "File test regression checklist: no file writes, no patch apply, no file deletion, no shell/git/test/build/smoke command execution, and no arbitrary local file browsing from UI.",
      ],
      feedbackRegressionChecklist: [
        "Feedback regression checklist: no feedback auto-ingestion, no memory mutation, no memory auto-promotion, no Brain graph mutation, and no unsafe feedback shortcut acceptance.",
      ],
      deniedRegressionActions: [
        "Denied regression actions: run tests, run smoke, execute workflows, apply fixes, apply hardening, mutate files, approve fixes automatically, call providers, call local models, call connectors, or create automations.",
      ],
      unresolvedRegressionBlockers: [
        "Unresolved regression blockers: missing operator-approved test run, missing regression owner, unresolved feedback blockers, unresolved boundary gaps, and missing hardening owner.",
      ],
      rolloutHardeningRoute: "Rollout hardening route: /end-to-end-rollout-hardening-pass reviews hardening needs without applying changes.",
      finalLiveBoundarySignoffRoute: "Final live boundary signoff route: /live-execution-boundary-final-signoff reviews live boundaries without signing off automatically.",
      nextRecommendedAction: "Next recommended action: keep rollout regressions blocked until approved regression evidence is reviewed outside this page and hardening needs are explicitly approved.",
      advancedRolloutRegressionReviewDetails: "Advanced rollout regression review details: End-to-end rollout regression review is review-only. End-to-end rollout regression review does not run tests, rollout regression fixes require explicit operator approval, and unresolved rollout regressions stay blocked. It does not execute workflows, run tests, run smoke, apply fixes, apply hardening, mutate files, mutate memory, call providers, call local models, call connectors, create automations, store outputs, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildEndToEndRolloutRegressionReviewBoundary(): EndToEndRolloutRegressionReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, regressionTestExecutionAllowedFromUi: false, workflowExecutionAllowedFromUi: false, rolloutExecutionAllowedFromUi: false, hardeningApplyAllowedFromUi: false, fileMutationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, approvalAutomationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeEndToEndRolloutRegressionReview(model: Pick<EndToEndRolloutRegressionReviewModel, "reviews">): string {
  return "End-to-end rollout regression review summarizes " + model.reviews.length + " regression review packet without running tests. Rollout regression fixes require explicit operator approval, and unresolved rollout regressions stay blocked.";
}

export function buildEndToEndRolloutRegressionReviewModel(): EndToEndRolloutRegressionReviewModel {
  const reviews = buildEndToEndRolloutRegressionReviews();
  const model: EndToEndRolloutRegressionReviewModel = {
    title: "End-to-end rollout regression review",
    summary: "",
    reviews,
    boundary: buildEndToEndRolloutRegressionReviewBoundary(),
    language: [...END_TO_END_ROLLOUT_REGRESSION_REVIEW_LANGUAGE],
    advancedDetails: [
      "End-to-end rollout regression review",
      "Rollout regression review identity",
      "Regression groups",
      "Workflow regression checklist",
      "Provider/local/connector/automation regression checklist",
      "File test regression checklist",
      "Feedback regression checklist",
      "Denied regression actions",
      "Unresolved regression blockers",
      "Rollout hardening route",
      "Final live boundary signoff route",
      "Next recommended action",
      "End-to-end rollout regression review does not run tests",
      "Rollout regression fixes require explicit operator approval",
      "Unresolved rollout regressions stay blocked",
      "advanced rollout regression review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeEndToEndRolloutRegressionReview(model) };
}
