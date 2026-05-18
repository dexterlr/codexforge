import {
  buildRuntimeEventExecutorStableKey,
  type RuntimeEventApproval,
  type RuntimeEventAuditLedger,
  type RuntimeEventAuditLedgerItem,
  type RuntimeEventAuditLedgerState,
  type RuntimeEventExecutionResult,
  type RuntimeEventPayloadValidation,
  type RuntimeEventPolicy,
  type RuntimeEventReducerPreview,
  type RuntimeEventRequest,
} from "./runtime-event-executor-types";

export function buildRuntimeEventAuditLedgerItem(
  state: RuntimeEventAuditLedgerState,
  label: string,
  detail: string,
  requestId = "runtime-event"
): RuntimeEventAuditLedgerItem {
  return {
    id: buildRuntimeEventExecutorStableKey("runtime-event-audit", requestId, state, label),
    state,
    label,
    detail,
  };
}

export function buildRuntimeEventAuditLedger(input: {
  request: RuntimeEventRequest;
  policy?: RuntimeEventPolicy;
  validation?: RuntimeEventPayloadValidation;
  approval?: RuntimeEventApproval;
  reducerPreview?: RuntimeEventReducerPreview;
  result?: RuntimeEventExecutionResult;
}): RuntimeEventAuditLedger {
  const items: RuntimeEventAuditLedgerItem[] = [
    buildRuntimeEventAuditLedgerItem("request-created", "Request created", `${input.request.requestedEventType} request created.`, input.request.id),
    buildRuntimeEventAuditLedgerItem("policy-checked", "Policy checked", input.policy?.allowed ? "Policy allowed." : "Policy blocked or pending.", input.request.id),
    buildRuntimeEventAuditLedgerItem("validation-checked", "Validation checked", input.validation?.valid ? "Payload valid." : "Payload blocked or pending.", input.request.id),
    buildRuntimeEventAuditLedgerItem("approval-reviewed", "Approval reviewed", input.approval?.approved ? "Explicit approval captured." : "Approval required.", input.request.id),
    buildRuntimeEventAuditLedgerItem("reducer-preview-built", "Reducer preview built", input.reducerPreview?.ready ? "Reducer preview ready." : "Reducer preview pending.", input.request.id),
  ];

  if (input.result?.status === "dry-run-complete") items.push(buildRuntimeEventAuditLedgerItem("dry-run-complete", "Dry run complete", "Dry run returned an event preview only.", input.request.id));
  if (input.result?.status === "executed") items.push(buildRuntimeEventAuditLedgerItem("event-appended", "Event appended", "Event appended through executor boundary.", input.request.id));
  if (input.result && input.result.status !== "executed") items.push(buildRuntimeEventAuditLedgerItem("execution-blocked", "Execution blocked", input.result.errors.join(", ") || input.result.status, input.request.id));
  if (input.policy?.allowed && input.validation?.valid && input.approval?.approved && input.result?.status !== "executed") items.push(buildRuntimeEventAuditLedgerItem("request-ready", "Request ready", "Request is ready for guarded execution.", input.request.id));
  if (input.result) items.push(buildRuntimeEventAuditLedgerItem("result-captured", "Result captured", input.result.status, input.request.id));
  if (!input.approval?.approved) items.push(buildRuntimeEventAuditLedgerItem("review-required", "Review required", "Explicit approval required before append-only execution.", input.request.id));

  const ledger: RuntimeEventAuditLedger = {
    id: buildRuntimeEventExecutorStableKey("runtime-event-audit-ledger", input.request.id),
    requestId: input.request.id,
    items,
    summary: [],
  };
  return { ...ledger, summary: summarizeRuntimeEventAuditLedger(ledger) };
}

export function summarizeRuntimeEventAuditLedger(ledger: RuntimeEventAuditLedger): string[] {
  return [
    `Runtime event audit ledger has ${ledger.items.length} items.`,
    `States: ${ledger.items.map((item) => item.state).join(", ")}.`,
  ];
}
