import type {
  ApprovedBrainMergePolicy,
  ApprovedBrainMergeRequest,
  ApprovedBrainMergeResult,
  ApprovedBrainMergeValidation,
  ApprovedMergeLedger,
  ApprovedMergeLedgerItem,
  ApprovedMergeLedgerState,
} from "./approved-brain-merge-types";
import { buildApprovedBrainMergeStableKey } from "./approved-brain-merge-types";

export function buildApprovedMergeLedgerItem(args: {
  requestId: string;
  state: ApprovedMergeLedgerState;
  note: string;
}): ApprovedMergeLedgerItem {
  return {
    id: buildApprovedBrainMergeStableKey("approved-merge-ledger", args.requestId, args.state, args.note),
    requestId: args.requestId,
    state: args.state,
    note: args.note,
  };
}

export function buildApprovedMergeLedger(args: {
  request: ApprovedBrainMergeRequest;
  policy: ApprovedBrainMergePolicy;
  validation: ApprovedBrainMergeValidation;
  result?: ApprovedBrainMergeResult | null;
}): ApprovedMergeLedger {
  const items: ApprovedMergeLedgerItem[] = [
    buildApprovedMergeLedgerItem({
      requestId: args.request.id,
      state: "requested",
      note: "Approved Brain merge request built as local UI state.",
    }),
    buildApprovedMergeLedgerItem({
      requestId: args.request.id,
      state: args.validation.state === "blocked" || !args.policy.allowed ? "blocked" : "reviewed",
      note: args.policy.allowed
        ? "Policy reviewed; explicit merge approval controls apply."
        : args.policy.reasons.join(", "),
    }),
  ];

  if (args.request.approved) {
    items.push(
      buildApprovedMergeLedgerItem({
        requestId: args.request.id,
        state: "approved",
        note: args.request.approvalNote || "Approved locally in UI state.",
      })
    );
  }

  if (args.result) {
    items.push(
      buildApprovedMergeLedgerItem({
        requestId: args.request.id,
        state: args.result.state === "applied" ? "applied" : args.result.state,
        note: args.result.summary.join(" "),
      })
    );
    if (args.result.state === "applied") {
      items.push(
        buildApprovedMergeLedgerItem({
          requestId: args.request.id,
          state: "rollback-available",
          note: "Rollback plan available with before/after summary.",
        })
      );
    }
  }

  const ledger: ApprovedMergeLedger = {
    id: "approved-brain-merge-ledger",
    items,
    summary: [],
  };

  return { ...ledger, summary: summarizeApprovedMergeLedger(ledger) };
}

export function summarizeApprovedMergeLedger(ledger: ApprovedMergeLedger): string[] {
  return [
    `${ledger.items.length} approved merge ledger item(s).`,
    "Ledger states: requested, blocked, approved, applied, failed, rollback-available, reviewed.",
    "Merge ledger is pure local UI state or safe metadata; it does not write source files.",
  ];
}
