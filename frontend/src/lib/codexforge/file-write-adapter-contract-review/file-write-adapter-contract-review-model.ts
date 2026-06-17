import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFileWriteAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildFileWriteAdapterContractReviewStableKey };

export const FILE_WRITE_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "File write adapter contract review",
  "File write adapter contract review does not write files",
  "File write adapters require explicit operator approval",
  "Adapter not executable from UI",
  "Input contract",
  "Output contract",
  "Path allowlist/denylist",
  "Diff preview",
  "Rollback",
  "Audit",
  "Denied file write adapter actions",
] as const;

const FILE_WRITE_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "File write adapter contract review identity",
  "Input contract",
  "Output contract",
  "Path allowlist/denylist",
  "Diff preview",
  "Rollback",
  "Audit",
  "Denied file write adapter actions",
  "Unresolved file write adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced file write adapter contract review details collapsed/secondary",
] as const;

export function buildFileWriteAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("file-write-adapter-contract-review", input);
}

export function buildFileWriteAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildFileWriteAdapterContractReview({
      idHint: "file-write-adapter-contract-review",
      status: "blocked",
      identity: "File write adapter contract review identity: File write adapter contract review does not write files. File write adapters require explicit operator approval before any future file mutation.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Input contract", items: ["Input contract: requested operation, target path, workspace root, file ownership, intended content or patch summary, risk classification, reason, and approval request must be visible."] },
        { label: "Output contract", items: ["Output contract: future adapters must return blocked, approved, failed, or completed status; changed file list; diff summary; evidence pointer; audit note; and rollback reference without storing results automatically."] },
        { label: "Path allowlist/denylist", items: ["Path allowlist/denylist: allowed workspace roots, denied secrets, denied generated folders, denied parent traversal, denied arbitrary absolute paths, and denied hidden path surprises must be reviewed."] },
        { label: "Diff preview", items: ["Diff preview: before/after summary, created/updated/deleted files, sensitive line redaction, expected side effects, and operator review state are required before any write can be considered."] },
        { label: "Rollback", items: ["Rollback: future file write adapters need backup expectations, restore plan, cleanup plan, escalation owner, and recovery evidence before approval."] },
        { label: "Audit", items: ["Audit: future file writes must record requested path, approval scope, denied paths, diff identity, reviewer, timestamp supplied by backend, and no persisted approval decision from this UI."] },
        { label: "Denied file write adapter actions", items: ["Denied file write adapter actions: write files, delete files, move files, rename files, apply patches, scaffold projects, export packages, browse arbitrary files, persist approvals, or mutate Brain graph from UI."] },
        { label: "Unresolved file write adapter blockers", items: ["Unresolved file write adapter blockers: no approved write implementation, no path guard, no diff renderer, no rollback implementation, no audit store, and no evidence route keep file writes blocked."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/command-runner-adapter-contract-review", "/recovery-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep file writing blocked while the path policy, diff preview, rollback, and audit contract are reviewed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("file write adapter contract review", FILE_WRITE_ADAPTER_CONTRACT_REVIEW_LANGUAGE, FILE_WRITE_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFileWriteAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeFileWriteAdapterContractReview(model: { fileWriteAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("File write adapter contract review", model.fileWriteAdapterContractReviews, "File write adapters require explicit operator approval.");
}

export function buildFileWriteAdapterContractReviewModel() {
  const fileWriteAdapterContractReviews = buildFileWriteAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 667",
    title: "File write adapter contract review",
    summarySubject: "File write adapter contract review",
    approvalCopy: "File write adapters require explicit operator approval.",
    subtitle: "Review the file write adapter contract without writing files.",
    primaryLabel: "Review file write adapter",
    anchor: "file-write-adapter-contract-review",
    plainEnglishTitle: "Plain-English file write adapter contract review",
    plainEnglishCopy: "This page defines what a real file write adapter must show before it can ever write: the input, output, path rules, diff, rollback, audit, and denied actions. The adapter is not implemented yet and is not executable from UI.",
    language: FILE_WRITE_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...FILE_WRITE_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/command-runner-adapter-contract-review", label: "Command runner adapter" },
      { href: "/recovery-adapter-contract-review", label: "Recovery adapter" },
    ],
    packets: fileWriteAdapterContractReviews,
    advancedCopy: "advanced file write adapter contract review details collapsed/secondary. This route does not write files, delete files, mutate paths, apply patches, scaffold projects, persist approvals, store outputs, or call local bridge endpoints.",
    dataScope: "file-write-adapter-contract-review buildFileWriteAdapterContractReviewStableKey FileWriteAdapterContractReviewPanel",
  });
  return { ...model, fileWriteAdapterContractReviews };
}
