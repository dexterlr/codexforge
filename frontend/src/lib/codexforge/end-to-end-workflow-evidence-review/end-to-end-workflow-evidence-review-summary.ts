import type { EndToEndWorkflowEvidenceReview, EndToEndWorkflowEvidenceReviewBoundary, EndToEndWorkflowEvidenceReviewModel } from "./end-to-end-workflow-evidence-review-types";
import { buildEndToEndWorkflowEvidenceReviewStableKey } from "./end-to-end-workflow-evidence-review-types";

export const END_TO_END_WORKFLOW_EVIDENCE_REVIEW_LANGUAGE = [
  "End-to-end workflow evidence review",
  "End-to-end workflow evidence review does not ingest evidence automatically",
  "Evidence requires operator review before use",
  "Private end-to-end evidence stays redacted",
  "Evidence groups",
  "Provider local connector file test evidence checklist",
] as const;

export function buildEndToEndWorkflowEvidenceReview(input: Omit<EndToEndWorkflowEvidenceReview, "id"> & { idHint: string }): EndToEndWorkflowEvidenceReview {
  const { idHint, ...review } = input;
  return { id: buildEndToEndWorkflowEvidenceReviewStableKey("end-to-end-workflow-evidence-review", idHint, input.status), ...review };
}

export function buildEndToEndWorkflowEvidenceReviews(): EndToEndWorkflowEvidenceReview[] {
  return [
    buildEndToEndWorkflowEvidenceReview({
      idHint: "end-to-end-workflow-evidence-review-packet",
      status: "blocked",
      endToEndWorkflowEvidenceIdentity: "End-to-end workflow evidence identity: end-to-end-workflow-evidence-review-packet.",
      evidenceGroups: [
        "Evidence groups: provider evidence, local model evidence, connector evidence, file patch evidence, test execution evidence, audit evidence, redaction evidence, and operator approval evidence.",
      ],
      providerLocalConnectorFileTestEvidenceChecklist: [
        "Provider local connector file test evidence checklist: each evidence item must name source, boundary, redaction status, citation, approval owner, retention rule, and denied automatic ingestion path.",
      ],
      citationSourceChecklist: [
        "Citation/source checklist: evidence needs source names, timestamps supplied by approved evidence packets, scope, confidence, missing citations, and operator-reviewed gaps before use.",
      ],
      redactionPrivacyChecklist: [
        "Redaction/privacy checklist: private end-to-end evidence stays redacted, secrets stay hidden, connector data stays minimized, and provider/local/test outputs are not stored by this UI.",
      ],
      operatorApprovalChecklist: [
        "Operator approval checklist: evidence requires operator review before use, with accept, reject, redact, defer, or request-more-evidence decisions handled outside this page.",
      ],
      deniedEvidenceActions: [
        "Denied evidence actions: ingest evidence automatically, store provider outputs, store local model outputs, store connector data, store test outputs, mutate files, mutate memory, or promote memory.",
      ],
      unresolvedEvidenceBlockers: [
        "Unresolved evidence blockers: missing source citation, missing redaction status, missing retention policy, missing operator approval, and unresolved private data exposure risk.",
      ],
      endToEndResultReviewRoute: "End-to-end result review route: /end-to-end-workflow-result-review reviews outputs before reuse without storing live outputs.",
      endToEndRecoveryReviewRoute: "End-to-end recovery review route: /end-to-end-workflow-recovery-review reviews recovery options without triggering them.",
      nextRecommendedAction: "Next recommended action: keep evidence blocked from use until citation, redaction, privacy, retention, and operator approval are complete outside this page.",
      advancedEvidenceReviewDetails: "Advanced evidence review details: End-to-end workflow evidence review is review-only. End-to-end workflow evidence review does not ingest evidence automatically, evidence requires operator review before use, and private end-to-end evidence stays redacted. It does not store provider outputs, store local model outputs, store connector data, store test outputs, mutate files, mutate memory, auto-promote memory, call providers, call local models, call connectors, create automations, or create an MCP runtime.",
    }),
  ];
}

export function buildEndToEndWorkflowEvidenceReviewBoundary(): EndToEndWorkflowEvidenceReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, evidenceIngestionAllowedFromUi: false, evidenceAutoIngestionAllowedFromUi: false, providerOutputStorageAllowedFromUi: false, localModelOutputStorageAllowedFromUi: false, connectorDataStorageAllowedFromUi: false, testOutputStorageAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, memoryIngestionAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeEndToEndWorkflowEvidenceReview(model: Pick<EndToEndWorkflowEvidenceReviewModel, "evidenceReviews">): string {
  return "End-to-end workflow evidence review summarizes " + model.evidenceReviews.length + " evidence review packet. End-to-end workflow evidence review does not ingest evidence automatically, evidence requires operator review before use, and private end-to-end evidence stays redacted.";
}

export function buildEndToEndWorkflowEvidenceReviewModel(): EndToEndWorkflowEvidenceReviewModel {
  const evidenceReviews = buildEndToEndWorkflowEvidenceReviews();
  const model: EndToEndWorkflowEvidenceReviewModel = {
    title: "End-to-end workflow evidence review",
    summary: "",
    evidenceReviews,
    boundary: buildEndToEndWorkflowEvidenceReviewBoundary(),
    language: [...END_TO_END_WORKFLOW_EVIDENCE_REVIEW_LANGUAGE],
    advancedDetails: [
      "End-to-end workflow evidence review",
      "End-to-end workflow evidence identity",
      "Evidence groups",
      "Provider local connector file test evidence checklist",
      "Citation/source checklist",
      "Redaction/privacy checklist",
      "Operator approval checklist",
      "Denied evidence actions",
      "Unresolved evidence blockers",
      "End-to-end result review route",
      "End-to-end recovery review route",
      "Next recommended action",
      "End-to-end workflow evidence review does not ingest evidence automatically",
      "Evidence requires operator review before use",
      "Private end-to-end evidence stays redacted",
      "advanced evidence review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeEndToEndWorkflowEvidenceReview(model) };
}
