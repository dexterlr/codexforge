import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildResultStoreAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildResultStoreAdapterContractReviewStableKey };

export const RESULT_STORE_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Result store adapter contract review",
  "Result store adapter contract review does not store or reuse results",
  "Result storage/reuse requires explicit operator approval",
  "Adapter not executable from UI",
  "Acceptance/rejection",
  "Reuse",
  "Privacy",
  "Safety",
  "Retention",
  "Audit",
  "Denied result store adapter actions",
] as const;

const RESULT_STORE_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Result store adapter contract review identity",
  "Acceptance/rejection",
  "Reuse",
  "Privacy",
  "Safety",
  "Retention",
  "Audit",
  "Denied result store adapter actions",
  "Unresolved result store adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced result store adapter contract review details collapsed/secondary",
] as const;

export function buildResultStoreAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("result-store-adapter-contract-review", input);
}

export function buildResultStoreAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildResultStoreAdapterContractReview({
      idHint: "result-store-adapter-contract-review",
      status: "blocked",
      identity: "Result store adapter contract review identity: Result store adapter contract review does not store or reuse results. Result storage/reuse requires explicit operator approval before any future output persistence.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Acceptance/rejection", items: ["Acceptance/rejection: future results need accepted, rejected, needs edits, unsafe, or blocked states with reviewer rationale before reuse."] },
        { label: "Reuse", items: ["Reuse: result reuse scope, downstream workflow, citation/evidence dependency, memory boundary, and no automatic reuse must be visible."] },
        { label: "Privacy", items: ["Privacy: private data, connector payloads, local paths, meeting notes, personal data, and confidential output require review before storage."] },
        { label: "Safety", items: ["Safety: unsafe instructions, copyrighted material, trademark risk, policy conflicts, and harmful output need rejection or redaction before any future reuse."] },
        { label: "Retention", items: ["Retention: retention window, deletion path, export policy, owner, and no indefinite storage must be defined."] },
        { label: "Audit", items: ["Audit: future result storage needs source adapter, reviewer, accepted scope, retention rule, and no persisted approval decision from this UI."] },
        { label: "Denied result store adapter actions", items: ["Denied result store adapter actions: store outputs, reuse results automatically, persist memory, promote memory, export packages, trigger recovery, route to providers/connectors, or persist approvals from UI."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/evidence-store-adapter-contract-review", "/packaging-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep result storage blocked while acceptance, reuse, privacy, safety, retention, and audit contracts are reviewed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("result store adapter contract review", RESULT_STORE_ADAPTER_CONTRACT_REVIEW_LANGUAGE, RESULT_STORE_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildResultStoreAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeResultStoreAdapterContractReview(model: { resultStoreAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Result store adapter contract review", model.resultStoreAdapterContractReviews, "Result storage/reuse requires explicit operator approval.");
}

export function buildResultStoreAdapterContractReviewModel() {
  const resultStoreAdapterContractReviews = buildResultStoreAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 674",
    title: "Result store adapter contract review",
    summarySubject: "Result store adapter contract review",
    approvalCopy: "Result storage/reuse requires explicit operator approval.",
    subtitle: "Review the result store adapter contract without storing or reusing results.",
    primaryLabel: "Review result store adapter",
    anchor: "result-store-adapter-contract-review",
    plainEnglishTitle: "Plain-English result store adapter contract review",
    plainEnglishCopy: "This page defines what a real result store adapter must show before it can ever keep or reuse an output: acceptance, reuse scope, privacy, safety, retention, audit, and denied actions. It is not implemented yet.",
    language: RESULT_STORE_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...RESULT_STORE_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/evidence-store-adapter-contract-review", label: "Evidence store adapter" },
      { href: "/packaging-adapter-contract-review", label: "Packaging adapter" },
    ],
    packets: resultStoreAdapterContractReviews,
    advancedCopy: "advanced result store adapter contract review details collapsed/secondary. This route does not store results, reuse outputs, persist memory, promote memory, export packages, trigger recovery, route provider/connector traffic, or persist approvals.",
    dataScope: "result-store-adapter-contract-review buildResultStoreAdapterContractReviewStableKey ResultStoreAdapterContractReviewPanel",
  });
  return { ...model, resultStoreAdapterContractReviews };
}
