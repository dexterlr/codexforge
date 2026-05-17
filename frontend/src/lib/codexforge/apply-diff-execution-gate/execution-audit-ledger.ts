import {
  buildApplyDiffExecutionGateStableKey,
  type ApplyExecutionApprovalState,
  type ApplyExecutionAuditLedger,
  type ApplyExecutionAuditLedgerItem,
  type ApplyExecutionAuditLedgerState,
  type ApplyExecutionBridgePayload,
  type ApplyExecutionGateInput,
  type ApplyExecutionPolicyConfirmation,
  type ApplyExecutionRequestPacket,
  type ApplyExecutionResultContract,
} from "./apply-execution-gate-types";

const LEDGER_LABELS: Record<ApplyExecutionAuditLedgerState, string> = {
  "input-created": "Input created",
  "approval-reviewed": "Approval reviewed",
  "policy-confirmed": "Policy confirmed",
  "request-built": "Request built",
  "bridge-blocked": "Bridge blocked",
  "bridge-ready": "Bridge ready",
  "user-dispatched": "User dispatched",
  "result-captured": "Result captured",
  "verification-required": "Verification required",
  "rollback-ready": "Rollback ready",
};

export function buildApplyExecutionAuditLedgerItem(
  executionGateId: string,
  state: ApplyExecutionAuditLedgerState,
  detail?: string
): ApplyExecutionAuditLedgerItem {
  return {
    id: `apply-diff-execution-ledger:${buildApplyDiffExecutionGateStableKey(executionGateId, state)}`,
    executionGateId,
    state,
    label: LEDGER_LABELS[state],
    detail: detail ?? `${LEDGER_LABELS[state]} in local UI state only.`,
  };
}

export function buildApplyExecutionAuditLedger(args: {
  input: ApplyExecutionGateInput;
  approvalState: ApplyExecutionApprovalState;
  policyConfirmation: ApplyExecutionPolicyConfirmation;
  requestPacket: ApplyExecutionRequestPacket;
  bridgePayload: ApplyExecutionBridgePayload;
  resultContract: ApplyExecutionResultContract;
}): ApplyExecutionAuditLedger {
  const items: ApplyExecutionAuditLedgerItem[] = [
    buildApplyExecutionAuditLedgerItem(args.input.id, "input-created", `Execution gate input created from dry run ${args.input.dryRunId}.`),
    buildApplyExecutionAuditLedgerItem(
      args.input.id,
      "approval-reviewed",
      args.approvalState.satisfied ? "Approval reviewed and satisfied." : "Approval reviewed and still missing acknowledgement."
    ),
    buildApplyExecutionAuditLedgerItem(
      args.input.id,
      "policy-confirmed",
      args.policyConfirmation.ready ? "Policy confirmed for guarded execute route dispatch." : args.policyConfirmation.blockedReasons.join(" ")
    ),
    buildApplyExecutionAuditLedgerItem(
      args.input.id,
      "request-built",
      args.requestPacket.ready ? "Request packet built and ready." : "Request packet built as blocked preview."
    ),
    buildApplyExecutionAuditLedgerItem(
      args.input.id,
      args.bridgePayload.canDispatch ? "bridge-ready" : "bridge-blocked",
      args.bridgePayload.canDispatch ? "Bridge ready for explicit user dispatch." : args.bridgePayload.blockedReasons.join(" ")
    ),
  ];

  if (args.resultContract.status === "dispatched" || args.resultContract.status === "completed" || args.resultContract.status === "failed") {
    items.push(buildApplyExecutionAuditLedgerItem(args.input.id, "user-dispatched", "User-dispatched apply request was captured in local state."));
  }
  if (args.resultContract.status === "completed" || args.resultContract.status === "failed" || args.resultContract.status === "cancelled") {
    items.push(buildApplyExecutionAuditLedgerItem(args.input.id, "result-captured", `Result contract captured with status ${args.resultContract.status}.`));
  }

  items.push(
    buildApplyExecutionAuditLedgerItem(args.input.id, "verification-required", "Verification required after dispatch."),
    buildApplyExecutionAuditLedgerItem(args.input.id, "rollback-ready", "Rollback plan required and ready for operator review.")
  );

  return {
    id: `apply-diff-execution-ledger:${buildApplyDiffExecutionGateStableKey(args.input.id)}`,
    executionGateId: args.input.id,
    items,
    summary: summarizeApplyExecutionAuditLedger(items),
  };
}

export function summarizeApplyExecutionAuditLedger(
  ledgerOrItems: ApplyExecutionAuditLedger | readonly ApplyExecutionAuditLedgerItem[]
): string[] {
  const items = "items" in ledgerOrItems ? ledgerOrItems.items : ledgerOrItems;

  return [
    `${items.length} execution gate ledger item(s) prepared.`,
    "Ledger includes user-dispatched and result-captured states when dispatch occurs.",
    "Ledger is local UI state only; no persistence writes are performed.",
  ];
}
