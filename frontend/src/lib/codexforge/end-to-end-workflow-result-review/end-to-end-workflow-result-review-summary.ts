import type { EndToEndWorkflowResultReview, EndToEndWorkflowResultReviewBoundary, EndToEndWorkflowResultReviewModel } from "./end-to-end-workflow-result-review-types";
import { buildEndToEndWorkflowResultReviewStableKey } from "./end-to-end-workflow-result-review-types";

export const END_TO_END_WORKFLOW_RESULT_REVIEW_LANGUAGE = [
  "End-to-end workflow result review",
  "End-to-end workflow result review does not store live outputs",
  "End-to-end results require operator review before use",
  "Unsafe end-to-end results remain blocked",
  "Result groups",
  "Acceptance checklist",
] as const;

export function buildEndToEndWorkflowResultReview(input: Omit<EndToEndWorkflowResultReview, "id"> & { idHint: string }): EndToEndWorkflowResultReview {
  const { idHint, ...review } = input;
  return { id: buildEndToEndWorkflowResultReviewStableKey("end-to-end-workflow-result-review", idHint, input.status), ...review };
}

export function buildEndToEndWorkflowResultReviews(): EndToEndWorkflowResultReview[] {
  return [
    buildEndToEndWorkflowResultReview({
      idHint: "end-to-end-workflow-result-review-packet",
      status: "blocked",
      endToEndWorkflowResultIdentity: "End-to-end workflow result identity: end-to-end-workflow-result-review-packet.",
      resultGroups: [
        "Result groups: accepted candidates, rejected candidates, unsafe outputs, missing evidence, reuse requests, retention decisions, and operator decision gaps.",
      ],
      acceptanceChecklist: [
        "Acceptance checklist: end-to-end results require operator review before use, evidence alignment, safety review, boundary provenance, and explicit reuse approval outside this page.",
      ],
      rejectionChecklist: [
        "Rejection checklist: unsafe, uncited, private, incomplete, stale, or unapproved results remain blocked and must not be reused automatically.",
      ],
      reuseChecklist: [
        "Reuse checklist: result reuse needs approved source, redaction, scope, retention, user-visible caveat, and no memory/file mutation from this UI.",
      ],
      safetyReviewChecklist: [
        "Safety review checklist: inspect prompt leakage, connector privacy, provider/local output risk, file mutation risk, and test evidence mismatch before reuse.",
      ],
      deniedResultActions: [
        "Denied result actions: store live outputs, ingest results, reuse results automatically, persist approval decisions, mutate files, mutate memory, or promote memory.",
      ],
      unresolvedResultBlockers: [
        "Unresolved result blockers: missing operator review, missing evidence match, unresolved safety issue, missing rejection path, and missing retention decision.",
      ],
      endToEndRecoveryReviewRoute: "End-to-end recovery review route: /end-to-end-workflow-recovery-review reviews recovery options without triggering them.",
      endToEndHardeningRoute: "End-to-end hardening route: /end-to-end-workflow-hardening-pass reviews hardening needs without applying changes.",
      nextRecommendedAction: "Next recommended action: keep unsafe end-to-end results blocked until acceptance, rejection, reuse, safety review, and operator approval are complete outside this page.",
      advancedResultReviewDetails: "Advanced result review details: End-to-end workflow result review is review-only. End-to-end workflow result review does not store live outputs, end-to-end results require operator review before use, and unsafe end-to-end results remain blocked. It does not ingest results, reuse results automatically, persist approvals, mutate files, mutate memory, auto-promote memory, call providers, call local models, call connectors, create automations, or create an MCP runtime.",
    }),
  ];
}

export function buildEndToEndWorkflowResultReviewBoundary(): EndToEndWorkflowResultReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, resultStorageAllowedFromUi: false, resultIngestionAllowedFromUi: false, resultAcceptanceAutomationAllowedFromUi: false, outputStorageAllowed: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, memoryIngestionAllowedFromUi: false, providerOutputStorageAllowedFromUi: false, connectorDataStorageAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, credentialStorageAllowed: false };
}

export function summarizeEndToEndWorkflowResultReview(model: Pick<EndToEndWorkflowResultReviewModel, "resultReviews">): string {
  return "End-to-end workflow result review summarizes " + model.resultReviews.length + " result review packet. End-to-end workflow result review does not store live outputs, end-to-end results require operator review before use, and unsafe end-to-end results remain blocked.";
}

export function buildEndToEndWorkflowResultReviewModel(): EndToEndWorkflowResultReviewModel {
  const resultReviews = buildEndToEndWorkflowResultReviews();
  const model: EndToEndWorkflowResultReviewModel = {
    title: "End-to-end workflow result review",
    summary: "",
    resultReviews,
    boundary: buildEndToEndWorkflowResultReviewBoundary(),
    language: [...END_TO_END_WORKFLOW_RESULT_REVIEW_LANGUAGE],
    advancedDetails: [
      "End-to-end workflow result review",
      "End-to-end workflow result identity",
      "Result groups",
      "Acceptance checklist",
      "Rejection checklist",
      "Reuse checklist",
      "Safety review checklist",
      "Denied result actions",
      "Unresolved result blockers",
      "End-to-end recovery review route",
      "End-to-end hardening route",
      "Next recommended action",
      "End-to-end workflow result review does not store live outputs",
      "End-to-end results require operator review before use",
      "Unsafe end-to-end results remain blocked",
      "advanced result review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeEndToEndWorkflowResultReview(model) };
}
