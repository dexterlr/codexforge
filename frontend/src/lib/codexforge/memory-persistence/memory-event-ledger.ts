import {
  buildMemoryEventStableKey,
  type MemoryEventLedger,
  type MemoryEventLedgerItem,
  type MemoryEventLedgerState,
  type MemoryEventPersistenceRequest,
  type MemoryEventValidation,
} from "./memory-persistence-types";

export function buildMemoryEventLedger(
  requests: readonly MemoryEventPersistenceRequest[],
  validations: readonly MemoryEventValidation[] = []
): MemoryEventLedger {
  const items = requests.map((request) => {
    const validation = validations.find((entry) => entry.id.endsWith(request.eventId));
    const state: MemoryEventLedgerState =
      validation?.state === "blocked"
        ? "blocked"
        : request.approved
          ? "approved"
          : "requested";

    return buildMemoryEventLedgerItem({
      request,
      state,
      note: validation?.summary[0] ?? "Persistence request is staged for explicit approval.",
    });
  });

  return {
    id: "memory-event-ledger",
    items,
    summary: summarizeMemoryEventLedger(items),
  };
}

export function buildMemoryEventLedgerItem(args: {
  request: MemoryEventPersistenceRequest;
  state: MemoryEventLedgerState;
  note: string;
}): MemoryEventLedgerItem {
  return {
    id: buildMemoryEventStableKey("memory-event-ledger-item", args.request.eventId, args.state),
    eventId: args.request.eventId,
    candidateId: args.request.candidateId,
    reviewId: args.request.reviewId,
    state: args.state,
    targetRelativePath: args.request.targetRelativePath,
    note: args.note,
  };
}

export function summarizeMemoryEventLedger(
  ledgerOrItems: MemoryEventLedger | readonly MemoryEventLedgerItem[]
): string[] {
  const items = "items" in ledgerOrItems ? ledgerOrItems.items : ledgerOrItems;
  const approved = items.filter((item) => item.state === "approved").length;
  const persisted = items.filter((item) => item.state === "persisted").length;
  const blocked = items.filter((item) => item.state === "blocked").length;

  return [
    `${items.length} memory event ledger item(s).`,
    `${approved} approved, ${persisted} persisted, ${blocked} blocked.`,
    "Ledger records approved runtime events only and does not merge graph memory.",
  ];
}
