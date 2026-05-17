import {
  buildApplyDiffDryRunStableKey,
  type ApplyDiffDryRunInput,
  type ApplyDiffDryRunPolicy,
  type ApplyDiffDryRunSimulation,
  type ApplyDryRunConflictCheck,
  type ApplyDryRunFileImpact,
  type ApplyDryRunLedger,
  type ApplyDryRunLedgerItem,
  type ApplyDryRunLedgerState,
  type ApplyDryRunResult,
} from "./apply-dry-run-types";

const LEDGER_LABELS: Record<ApplyDryRunLedgerState, string> = {
  requested: "Requested",
  "input-validated": "Input validated",
  "policy-checked": "Policy checked",
  "simulation-started": "Simulation started",
  "file-impact-built": "File impact built",
  "conflict-check-built": "Conflict check built",
  blocked: "Blocked",
  "dry-run-complete": "Dry-run complete",
  "ready-for-real-patch-review": "Ready for real patch review",
};

export function buildApplyDryRunLedgerItem(
  dryRunId: string,
  state: ApplyDryRunLedgerState,
  detail?: string
): ApplyDryRunLedgerItem {
  return {
    id: `apply-diff-dry-run-ledger:${buildApplyDiffDryRunStableKey(dryRunId, state)}`,
    dryRunId,
    state,
    label: LEDGER_LABELS[state],
    detail: detail ?? `${LEDGER_LABELS[state]} in local React state only.`,
  };
}

export function buildApplyDryRunLedger(args: {
  input: ApplyDiffDryRunInput;
  policy: ApplyDiffDryRunPolicy;
  simulation: ApplyDiffDryRunSimulation;
  fileImpact: ApplyDryRunFileImpact;
  conflictCheck: ApplyDryRunConflictCheck;
  result: ApplyDryRunResult;
}): ApplyDryRunLedger {
  const items: ApplyDryRunLedgerItem[] = [
    buildApplyDryRunLedgerItem(args.input.id, "requested", `Dry run requested for apply gate ${args.input.applyGateId}.`),
    buildApplyDryRunLedgerItem(args.input.id, "input-validated", `${args.input.targetFiles.length} target file(s) supplied.`),
    buildApplyDryRunLedgerItem(args.input.id, "policy-checked", args.policy.allowed ? "Policy checked for simulation." : args.policy.blockedReasons.join(" ")),
    buildApplyDryRunLedgerItem(args.input.id, "simulation-started", `Simulation status ${args.simulation.status}; no mutation started.`),
    buildApplyDryRunLedgerItem(args.input.id, "file-impact-built", `${args.fileImpact.items.length} impact item(s) built.`),
    buildApplyDryRunLedgerItem(args.input.id, "conflict-check-built", `${args.conflictCheck.items.length} conflict item(s) built.`),
  ];

  if (!args.result.ok) {
    items.push(buildApplyDryRunLedgerItem(args.input.id, "blocked", args.result.blockedReasons.join(" ") || "Dry run result is blocked."));
  }
  if (args.result.status === "dry-run-complete") {
    items.push(buildApplyDryRunLedgerItem(args.input.id, "dry-run-complete", "Dry-run complete as simulation only; no persistence writes."));
  }
  if (args.result.status === "ready-for-real-patch-review") {
    items.push(buildApplyDryRunLedgerItem(args.input.id, "ready-for-real-patch-review", "Ready for real patch review; actual apply remains blocked."));
  }

  return {
    id: `apply-diff-dry-run-ledger:${buildApplyDiffDryRunStableKey(args.input.id)}`,
    dryRunId: args.input.id,
    items,
    summary: summarizeApplyDryRunLedger(items),
  };
}

export function summarizeApplyDryRunLedger(
  ledgerOrItems: ApplyDryRunLedger | readonly ApplyDryRunLedgerItem[]
): string[] {
  const items = "items" in ledgerOrItems ? ledgerOrItems.items : ledgerOrItems;

  return [
    `${items.length} dry-run ledger event(s) prepared.`,
    "Ledger includes policy-checked and dry-run-complete states when applicable.",
    "Ledger is display-only and has no persistence writes.",
  ];
}
