import {
  type MemoryReviewAction,
  type MemoryReviewItem,
  type MemoryReviewLedger,
  type MemoryReviewLedgerItem,
  type MemoryReviewLedgerState,
  type MemoryReviewQueue,
  buildMemoryReviewStableKey,
} from "./memory-review-types";

export function buildMemoryReviewLedger(
  queue: MemoryReviewQueue,
  actions: readonly MemoryReviewAction[] = []
): MemoryReviewLedger {
  const items = queue.items.map((item) =>
    buildMemoryReviewLedgerItem(
      item,
      actions.filter((action) => action.itemId === item.id)
    )
  );

  return {
    id: "memory-review-ledger",
    items,
    summary: summarizeMemoryReviewLedger(items),
  };
}

export function buildMemoryReviewLedgerItem(
  item: MemoryReviewItem,
  actions: readonly MemoryReviewAction[] = []
): MemoryReviewLedgerItem {
  const latest = actions[actions.length - 1];
  const state = selectLedgerState(item, latest);

  return {
    id: buildMemoryReviewStableKey("memory-review-ledger-item", item.id, state),
    itemId: item.id,
    candidateId: item.candidateId,
    title: item.title,
    state,
    reviewState: item.reviewState,
    note: latest?.note ?? "Candidate queued for deterministic review.",
  };
}

export function summarizeMemoryReviewLedger(
  ledgerOrItems: MemoryReviewLedger | readonly MemoryReviewLedgerItem[]
): string[] {
  const items = "items" in ledgerOrItems ? ledgerOrItems.items : ledgerOrItems;
  const approved = items.filter((item) => item.state === "approved").length;
  const previewed = items.filter((item) => item.state === "promotion-event-previewed").length;

  return [
    `${items.length} ledger item(s) tracked.`,
    `${approved} approved item(s); ${previewed} promotion-event-previewed item(s).`,
    "Ledger is local review history only; future-persisted is reserved for a later persistence phase.",
  ];
}

function selectLedgerState(
  item: MemoryReviewItem,
  latest?: MemoryReviewAction
): MemoryReviewLedgerState {
  if (latest?.type === "preview-promotion-event") return "promotion-event-previewed";
  if (item.reviewState === "approved-for-promotion") return "approved";
  if (item.reviewState === "rejected") return "rejected";
  if (item.reviewState === "deferred") return "deferred";
  if (item.reviewState === "needs-review") return "reviewed";
  return "queued";
}
