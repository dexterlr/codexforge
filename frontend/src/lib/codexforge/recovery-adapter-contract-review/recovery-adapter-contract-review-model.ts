import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildRecoveryAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildRecoveryAdapterContractReviewStableKey };

export const RECOVERY_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Recovery adapter contract review",
  "Recovery adapter contract review does not trigger recovery or retry",
  "Recovery adapters require explicit operator approval",
  "Adapter not executable from UI",
  "Retry",
  "Rollback",
  "Cleanup",
  "Escalation",
  "Evidence",
  "Audit",
  "Denied recovery adapter actions",
] as const;

const RECOVERY_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Recovery adapter contract review identity",
  "Retry",
  "Rollback",
  "Cleanup",
  "Escalation",
  "Evidence",
  "Audit",
  "Denied recovery adapter actions",
  "Unresolved recovery adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced recovery adapter contract review details collapsed/secondary",
] as const;

export function buildRecoveryAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("recovery-adapter-contract-review", input);
}

export function buildRecoveryAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildRecoveryAdapterContractReview({
      idHint: "recovery-adapter-contract-review",
      status: "blocked",
      identity: "Recovery adapter contract review identity: Recovery adapter contract review does not trigger recovery or retry. Recovery adapters require explicit operator approval before any future retry, rollback, cleanup, or escalation action.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Retry", items: ["Retry: retry reason, limit, backoff policy, changed input, owner, and no automatic retry must be reviewed."] },
        { label: "Rollback", items: ["Rollback: rollback target, restore plan, affected files/processes/results, evidence need, and approval scope must be visible."] },
        { label: "Cleanup", items: ["Cleanup: partial outputs, temporary files, stale processes, connector side effects, package artifacts, and manual confirmation need review."] },
        { label: "Escalation", items: ["Escalation: owner, severity, blocked state, handoff route, and operator decision are required before any recovery path is selected."] },
        { label: "Evidence", items: ["Evidence: failure evidence, logs, diffs, outputs, connector status, and redaction state must be reviewed before recovery is approved."] },
        { label: "Audit", items: ["Audit: future recovery needs request identity, original failure, approved action, denied alternatives, reviewer, and no persisted approval decision here."] },
        { label: "Denied recovery adapter actions", items: ["Denied recovery adapter actions: trigger retry, rollback files, clean up files, rerun commands, restart runtimes, call providers/connectors, create automations, execute workflows, or apply fixes from UI."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/file-write-adapter-contract-review", "/command-runner-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep recovery blocked while retry, rollback, cleanup, escalation, evidence, and audit contracts are reviewed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("recovery adapter contract review", RECOVERY_ADAPTER_CONTRACT_REVIEW_LANGUAGE, RECOVERY_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildRecoveryAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeRecoveryAdapterContractReview(model: { recoveryAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Recovery adapter contract review", model.recoveryAdapterContractReviews, "Recovery adapters require explicit operator approval.");
}

export function buildRecoveryAdapterContractReviewModel() {
  const recoveryAdapterContractReviews = buildRecoveryAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 675",
    title: "Recovery adapter contract review",
    summarySubject: "Recovery adapter contract review",
    approvalCopy: "Recovery adapters require explicit operator approval.",
    subtitle: "Review the recovery adapter contract without triggering recovery or retry.",
    primaryLabel: "Review recovery adapter",
    anchor: "recovery-adapter-contract-review",
    plainEnglishTitle: "Plain-English recovery adapter contract review",
    plainEnglishCopy: "This page defines what a real recovery adapter must show before it can ever retry, rollback, clean up, or escalate: retry, rollback, cleanup, evidence, audit, and denied actions. It is not implemented yet.",
    language: RECOVERY_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...RECOVERY_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/file-write-adapter-contract-review", label: "File write adapter" },
      { href: "/command-runner-adapter-contract-review", label: "Command runner adapter" },
    ],
    packets: recoveryAdapterContractReviews,
    advancedCopy: "advanced recovery adapter contract review details collapsed/secondary. This route does not trigger recovery, trigger retry, rollback files, clean up files, rerun commands, restart runtimes, call providers/connectors, create automations, execute workflows, or apply fixes.",
    dataScope: "recovery-adapter-contract-review buildRecoveryAdapterContractReviewStableKey RecoveryAdapterContractReviewPanel",
  });
  return { ...model, recoveryAdapterContractReviews };
}
