import type { FirstRealEndToEndWorkflowTrialReview, FirstRealEndToEndWorkflowTrialReviewBoundary, FirstRealEndToEndWorkflowTrialReviewModel } from "./first-real-end-to-end-workflow-trial-review-types";
import { buildFirstRealEndToEndWorkflowTrialReviewStableKey } from "./first-real-end-to-end-workflow-trial-review-types";

export const FIRST_REAL_END_TO_END_WORKFLOW_TRIAL_REVIEW_LANGUAGE = [
  "First real end-to-end workflow trial review",
  "First real end-to-end workflow trial review does not execute workflows",
  "End-to-end trial decisions require explicit operator approval",
  "Unresolved end-to-end trial blockers stay blocked",
  "Trial review groups",
  "Boundary readiness checklist",
] as const;

export function buildFirstRealEndToEndWorkflowTrialReview(input: Omit<FirstRealEndToEndWorkflowTrialReview, "id"> & { idHint: string }): FirstRealEndToEndWorkflowTrialReview {
  const { idHint, ...review } = input;
  return { id: buildFirstRealEndToEndWorkflowTrialReviewStableKey("first-real-end-to-end-workflow-trial-review", idHint, input.status), ...review };
}

export function buildFirstRealEndToEndWorkflowTrialReviews(): FirstRealEndToEndWorkflowTrialReview[] {
  return [
    buildFirstRealEndToEndWorkflowTrialReview({
      idHint: "end-to-end-workflow-trial-review-packet",
      status: "blocked",
      endToEndWorkflowTrialReviewIdentity: "End-to-end workflow trial review identity: first-real-end-to-end-workflow-trial-review-packet.",
      trialReviewGroups: [
        "Trial review groups: planned stages, boundary readiness, approval packet, evidence handling, result handling, recovery plan, operator decision, and blocked shortcuts.",
      ],
      boundaryReadinessChecklist: [
        "Boundary readiness checklist: provider, local model, connector, automation, file patch, test execution, evidence, result, recovery, and hardening boundaries must be explicit and reviewed before any trial claim.",
      ],
      approvalEvidenceResultRecoveryChecklist: [
        "Approval/evidence/result/recovery checklist: trial decisions require operator-approved evidence, reviewed results, documented rejection paths, and recovery handling before use.",
      ],
      operatorDecisionChecklist: [
        "Operator decision checklist: approve, reject, defer, request more evidence, or keep blocked; this page never accepts results automatically.",
      ],
      deniedTrialReviewActions: [
        "Denied trial review actions: execute workflows, accept trial results automatically, store outputs, persist approvals, trigger recovery, apply hardening, call providers, call local models, call connectors, or create automations.",
      ],
      unresolvedTrialReviewBlockers: [
        "Unresolved trial review blockers: missing approved boundary evidence, missing operator decision, missing result review, missing recovery plan, and unresolved safety blockers.",
      ],
      endToEndEvidenceReviewRoute: "End-to-end evidence review route: /end-to-end-workflow-evidence-review reviews evidence before use without ingesting it automatically.",
      endToEndResultReviewRoute: "End-to-end result review route: /end-to-end-workflow-result-review reviews outputs before reuse without storing live outputs.",
      nextRecommendedAction: "Next recommended action: keep unresolved end-to-end trial blockers blocked until approval, evidence, result, recovery, and operator decision packets are complete outside this page.",
      advancedWorkflowTrialReviewDetails: "Advanced workflow trial review details: First real end-to-end workflow trial review is review-only. First real end-to-end workflow trial review does not execute workflows, end-to-end trial decisions require explicit operator approval, and unresolved end-to-end trial blockers stay blocked. It does not accept results automatically, store outputs, trigger recovery, apply hardening, call providers, call local models, call connectors, create automations, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildFirstRealEndToEndWorkflowTrialReviewBoundary(): FirstRealEndToEndWorkflowTrialReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, workflowExecutionAllowedFromUi: false, controlledTrialExecutionAllowedFromUi: false, resultAcceptanceAutomationAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationExecutionAllowedFromUi: false, outputStorageAllowed: false, fileMutationAllowedFromUi: false, credentialStorageAllowed: false };
}

export function summarizeFirstRealEndToEndWorkflowTrialReview(model: Pick<FirstRealEndToEndWorkflowTrialReviewModel, "workflowTrialReviews">): string {
  return "First real end-to-end workflow trial review summarizes " + model.workflowTrialReviews.length + " end-to-end workflow trial review packet. First real end-to-end workflow trial review does not execute workflows, end-to-end trial decisions require explicit operator approval, and unresolved end-to-end trial blockers stay blocked.";
}

export function buildFirstRealEndToEndWorkflowTrialReviewModel(): FirstRealEndToEndWorkflowTrialReviewModel {
  const workflowTrialReviews = buildFirstRealEndToEndWorkflowTrialReviews();
  const model: FirstRealEndToEndWorkflowTrialReviewModel = {
    title: "First real end-to-end workflow trial review",
    summary: "",
    workflowTrialReviews,
    boundary: buildFirstRealEndToEndWorkflowTrialReviewBoundary(),
    language: [...FIRST_REAL_END_TO_END_WORKFLOW_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "First real end-to-end workflow trial review",
      "End-to-end workflow trial review identity",
      "Trial review groups",
      "Boundary readiness checklist",
      "Approval/evidence/result/recovery checklist",
      "Operator decision checklist",
      "Denied trial review actions",
      "Unresolved trial review blockers",
      "End-to-end evidence review route",
      "End-to-end result review route",
      "Next recommended action",
      "First real end-to-end workflow trial review does not execute workflows",
      "End-to-end trial decisions require explicit operator approval",
      "Unresolved end-to-end trial blockers stay blocked",
      "advanced workflow trial review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstRealEndToEndWorkflowTrialReview(model) };
}
