import {
  buildPatchPreviewQueueStableKey,
  type PatchPreviewQueueItem,
  type PatchPreviewQueueLedger,
  type PatchPreviewQueueLedgerItem,
  type PatchPreviewQueueLedgerState,
} from "./patch-preview-queue-types";
import { buildPatchPreviewQueuePolicy } from "./queue-policy";
import { buildPatchPreviewQueueReadinessItem } from "./queue-readiness";

const LABELS: Record<PatchPreviewQueueLedgerState, string> = {
  "recommendation-created": "Recommendation created",
  "recommendation-reviewed": "Recommendation reviewed",
  "queue-item-created": "Queue item created",
  "policy-checked": "Policy checked",
  "readiness-checked": "Readiness checked",
  "preview-handoff-built": "Preview handoff built",
  "selected-for-preview": "Selected for preview",
  blocked: "Blocked",
  rejected: "Rejected",
};

export function buildPatchPreviewQueueLedgerItem(
  item: PatchPreviewQueueItem,
  state: PatchPreviewQueueLedgerState,
  detail?: string
): PatchPreviewQueueLedgerItem {
  return {
    id: `patch-preview-queue-ledger:${buildPatchPreviewQueueStableKey(item.id, state)}`,
    itemId: item.id,
    state,
    label: LABELS[state],
    detail: detail ?? `${LABELS[state]} for ${item.sourceRecommendationTitle}.`,
  };
}

export function buildPatchPreviewQueueLedger(items: readonly PatchPreviewQueueItem[]): PatchPreviewQueueLedger {
  const ledgerItems = items.flatMap((item) => {
    const policy = buildPatchPreviewQueuePolicy(item);
    const readiness = buildPatchPreviewQueueReadinessItem(item);
    return [
      buildPatchPreviewQueueLedgerItem(item, "recommendation-created"),
      buildPatchPreviewQueueLedgerItem(item, "recommendation-reviewed", `Review state is ${item.reviewState}.`),
      buildPatchPreviewQueueLedgerItem(item, "queue-item-created", "Deterministic queue item created from stable recommendation fields."),
      buildPatchPreviewQueueLedgerItem(item, "policy-checked", policy.allowed ? "Policy allows preview queue handoff." : policy.blockedReasons.join(" ")),
      buildPatchPreviewQueueLedgerItem(item, "readiness-checked", `Readiness is ${readiness.status}.`),
      buildPatchPreviewQueueLedgerItem(item, "preview-handoff-built", "Preview handoff built for Safe Patch Preview."),
      ...(item.queueState === "selected" ? [buildPatchPreviewQueueLedgerItem(item, "selected-for-preview")] : []),
      ...(item.queueState === "blocked" ? [buildPatchPreviewQueueLedgerItem(item, "blocked", item.warnings.join(" ") || "Queue item blocked.")] : []),
      ...(item.queueState === "rejected" ? [buildPatchPreviewQueueLedgerItem(item, "rejected")] : []),
    ];
  });

  return {
    id: "patch-preview-queue-ledger",
    items: ledgerItems,
    summary: summarizePatchPreviewQueueLedger(ledgerItems),
  };
}

export function summarizePatchPreviewQueueLedger(items: readonly PatchPreviewQueueLedgerItem[]): string[] {
  return [
    `${items.length} ledger events prepared in local UI state only.`,
    "Ledger has no persistence writes and does not mutate Brain memory.",
    "Policy, readiness, and preview handoff events are visible before operator decision.",
  ];
}
