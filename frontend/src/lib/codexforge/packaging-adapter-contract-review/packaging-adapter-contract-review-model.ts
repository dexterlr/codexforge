import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildPackagingAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildPackagingAdapterContractReviewStableKey };

export const PACKAGING_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Packaging adapter contract review",
  "Packaging adapter contract review does not create packages or exports",
  "Packaging adapters require explicit operator approval",
  "Adapter not executable from UI",
  "Bundle",
  "Artifact",
  "Destination",
  "Redaction/license",
  "Handoff",
  "Rollback",
  "Denied packaging adapter actions",
] as const;

const PACKAGING_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Packaging adapter contract review identity",
  "Bundle",
  "Artifact",
  "Destination",
  "Redaction/license",
  "Handoff",
  "Rollback",
  "Denied packaging adapter actions",
  "Unresolved packaging adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced packaging adapter contract review details collapsed/secondary",
] as const;

export function buildPackagingAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("packaging-adapter-contract-review", input);
}

export function buildPackagingAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildPackagingAdapterContractReview({
      idHint: "packaging-adapter-contract-review",
      status: "blocked",
      identity: "Packaging adapter contract review identity: Packaging adapter contract review does not create packages or exports. Packaging adapters require explicit operator approval before any future bundle, artifact, destination, or handoff.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Bundle", items: ["Bundle: included files, excluded files, manifest, provenance, size, and no automatic bundle creation must be visible."] },
        { label: "Artifact", items: ["Artifact: artifact type, source result, evidence link, checksum policy, retention, and review state must be declared."] },
        { label: "Destination", items: ["Destination: local path, connector destination, download handoff, upload target, privacy class, and credential boundary require approval."] },
        { label: "Redaction/license", items: ["Redaction/license: secrets, private data, copyrighted content, trademark risk, third-party licenses, and generated asset provenance need review."] },
        { label: "Handoff", items: ["Handoff: recipient, summary, instructions, evidence packet, result status, and no automatic send behavior must be explicit."] },
        { label: "Rollback", items: ["Rollback: package deletion, destination cleanup, artifact invalidation, escalation, and evidence needs require operator approval."] },
        { label: "Denied packaging adapter actions", items: ["Denied packaging adapter actions: create packages, export files, write artifacts, upload destinations, send handoffs, store outputs, call connectors, download files, or persist approvals from UI."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/result-store-adapter-contract-review", "/game-server-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep packaging blocked while bundle, artifact, destination, redaction/license, handoff, and rollback contracts are reviewed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("packaging adapter contract review", PACKAGING_ADAPTER_CONTRACT_REVIEW_LANGUAGE, PACKAGING_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildPackagingAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizePackagingAdapterContractReview(model: { packagingAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Packaging adapter contract review", model.packagingAdapterContractReviews, "Packaging adapters require explicit operator approval.");
}

export function buildPackagingAdapterContractReviewModel() {
  const packagingAdapterContractReviews = buildPackagingAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 676",
    title: "Packaging adapter contract review",
    summarySubject: "Packaging adapter contract review",
    approvalCopy: "Packaging adapters require explicit operator approval.",
    subtitle: "Review the packaging adapter contract without creating packages or exports.",
    primaryLabel: "Review packaging adapter",
    anchor: "packaging-adapter-contract-review",
    plainEnglishTitle: "Plain-English packaging adapter contract review",
    plainEnglishCopy: "This page defines what a real packaging adapter must show before it can ever make a package or export: bundle, artifact, destination, redaction/license, handoff, rollback, and denied actions. It is not implemented yet.",
    language: PACKAGING_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...PACKAGING_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/result-store-adapter-contract-review", label: "Result store adapter" },
      { href: "/game-server-adapter-contract-review", label: "Game/server adapter" },
    ],
    packets: packagingAdapterContractReviews,
    advancedCopy: "advanced packaging adapter contract review details collapsed/secondary. This route does not create packages, create exports, write artifacts, upload destinations, send handoffs, store outputs, call connectors, download files, or persist approvals.",
    dataScope: "packaging-adapter-contract-review buildPackagingAdapterContractReviewStableKey PackagingAdapterContractReviewPanel",
  });
  return { ...model, packagingAdapterContractReviews };
}
