import {
  buildBrainMergeStableKey,
  type BrainEventQueue,
  type BrainMergeLedger,
  type BrainMergeLedgerItem,
  type BrainMergeLedgerState,
  type BrainMergePolicy,
} from "./brain-merge-types";

export function buildBrainMergeLedgerItem(args: {
  eventId: string;
  state: BrainMergeLedgerState;
  note: string;
}): BrainMergeLedgerItem {
  return {
    id: buildBrainMergeStableKey("brain-merge-ledger", args.eventId, args.state),
    eventId: args.eventId,
    state: args.state,
    note: args.note,
  };
}

export function buildBrainMergeLedger(
  queue: BrainEventQueue,
  policy: BrainMergePolicy
): BrainMergeLedger {
  const items = queue.events.map((event) =>
    buildBrainMergeLedgerItem({
      eventId: event.eventId,
      state: event.state === "blocked" ? "blocked" : policy.allowed ? "previewed" : "queued",
      note:
        event.state === "blocked"
          ? event.blockedReasons.join(", ")
          : "Queued for graph diff preview; no persistence writes.",
    })
  );
  const ledger: BrainMergeLedger = {
    id: "brain-merge-ledger",
    items,
    summary: [],
  };

  return { ...ledger, summary: summarizeBrainMergeLedger(ledger) };
}

export function summarizeBrainMergeLedger(ledger: BrainMergeLedger): string[] {
  return [
    `${ledger.items.length} merge ledger item(s) built in memory only.`,
    "Ledger states: queued, previewed, blocked, approved-for-future-merge, rejected, future-merged.",
    "No persistence writes are performed.",
  ];
}
