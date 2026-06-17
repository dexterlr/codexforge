import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildEvidenceStoreAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildEvidenceStoreAdapterContractReviewStableKey };

export const EVIDENCE_STORE_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Evidence store adapter contract review",
  "Evidence store adapter contract review does not store or ingest evidence",
  "Evidence storage requires explicit operator approval",
  "Adapter not executable from UI",
  "Source",
  "Citation",
  "Redaction",
  "Retention",
  "Privacy",
  "Audit",
  "Denied evidence store adapter actions",
] as const;

const EVIDENCE_STORE_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Evidence store adapter contract review identity",
  "Source",
  "Citation",
  "Redaction",
  "Retention",
  "Privacy",
  "Audit",
  "Denied evidence store adapter actions",
  "Unresolved evidence store adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced evidence store adapter contract review details collapsed/secondary",
] as const;

export function buildEvidenceStoreAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("evidence-store-adapter-contract-review", input);
}

export function buildEvidenceStoreAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildEvidenceStoreAdapterContractReview({
      idHint: "evidence-store-adapter-contract-review",
      status: "blocked",
      identity: "Evidence store adapter contract review identity: Evidence store adapter contract review does not store or ingest evidence. Evidence storage requires explicit operator approval before any future evidence capture, citation, retention, or audit entry.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Source", items: ["Source: evidence type, origin, owner, capture method, consent status, and no automatic source capture must be reviewed."] },
        { label: "Citation", items: ["Citation: citation label, source URL or local reference policy, quote/excerpt limits, freshness note, and contradiction link need operator review."] },
        { label: "Redaction", items: ["Redaction: secrets, tokens, private paths, personal data, connector payloads, copyrighted material, and screenshots need review before storage."] },
        { label: "Retention", items: ["Retention: retention window, deletion path, export rule, reuse scope, and no indefinite storage must be part of the contract."] },
        { label: "Privacy", items: ["Privacy: consent, data minimization, private connector data handling, workspace boundary, and no memory/RAG ingestion by default are required."] },
        { label: "Audit", items: ["Audit: future evidence writes need source identity, redaction decision, retention decision, reviewer, and no persisted approval decision from this UI."] },
        { label: "Denied evidence store adapter actions", items: ["Denied evidence store adapter actions: capture evidence, ingest evidence, store evidence, ingest memory/RAG, fetch sources, store connector data, persist outputs, or promote memory from UI."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/research-adapter-contract-review", "/result-store-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep evidence storage blocked while source, citation, redaction, retention, privacy, and audit contracts are reviewed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("evidence store adapter contract review", EVIDENCE_STORE_ADAPTER_CONTRACT_REVIEW_LANGUAGE, EVIDENCE_STORE_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildEvidenceStoreAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeEvidenceStoreAdapterContractReview(model: { evidenceStoreAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Evidence store adapter contract review", model.evidenceStoreAdapterContractReviews, "Evidence storage requires explicit operator approval.");
}

export function buildEvidenceStoreAdapterContractReviewModel() {
  const evidenceStoreAdapterContractReviews = buildEvidenceStoreAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 673",
    title: "Evidence store adapter contract review",
    summarySubject: "Evidence store adapter contract review",
    approvalCopy: "Evidence storage requires explicit operator approval.",
    subtitle: "Review the evidence store adapter contract without storing or ingesting evidence.",
    primaryLabel: "Review evidence store adapter",
    anchor: "evidence-store-adapter-contract-review",
    plainEnglishTitle: "Plain-English evidence store adapter contract review",
    plainEnglishCopy: "This page defines what a real evidence store adapter must show before it can ever capture or store evidence: source, citation, redaction, retention, privacy, audit, and denied actions. It is not implemented yet.",
    language: EVIDENCE_STORE_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...EVIDENCE_STORE_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/research-adapter-contract-review", label: "Research adapter" },
      { href: "/result-store-adapter-contract-review", label: "Result store adapter" },
    ],
    packets: evidenceStoreAdapterContractReviews,
    advancedCopy: "advanced evidence store adapter contract review details collapsed/secondary. This route does not store evidence, ingest evidence, capture evidence, fetch sources, store connector data, ingest memory/RAG, store outputs, or promote memory.",
    dataScope: "evidence-store-adapter-contract-review buildEvidenceStoreAdapterContractReviewStableKey EvidenceStoreAdapterContractReviewPanel",
  });
  return { ...model, evidenceStoreAdapterContractReviews };
}
