import {
  buildRuntimeEventExecutorStableKey,
  type RuntimeEventApproval,
  type RuntimeEventExecutionResult,
  type RuntimeEventExecutorStatus,
  type RuntimeEventExecutorSummary,
  type RuntimeEventPayloadValidation,
  type RuntimeEventPolicy,
  type RuntimeEventReducerPreview,
  type RuntimeEventRequest,
} from "./runtime-event-executor-types";

export function buildRuntimeEventExecutorSummary(input: {
  request?: RuntimeEventRequest;
  policy?: RuntimeEventPolicy;
  validation?: RuntimeEventPayloadValidation;
  approval?: RuntimeEventApproval;
  reducerPreview?: RuntimeEventReducerPreview;
  result?: RuntimeEventExecutionResult;
}): RuntimeEventExecutorSummary {
  const blockedReasons = Array.from(new Set([
    ...(input.policy?.blockedReasons ?? []),
    ...(input.validation?.blockedReasons ?? []),
    ...(input.result?.errors ?? []),
  ]));
  const executionStatus: RuntimeEventExecutorStatus = input.result?.status ?? (input.request ? "request-ready" : "not-requested");
  const summary: RuntimeEventExecutorSummary = {
    id: buildRuntimeEventExecutorStableKey("runtime-event-executor-summary", input.request?.id ?? "missing"),
    requestReady: Boolean(input.request) && blockedReasons.length === 0,
    policyReady: input.policy?.allowed === true,
    validationReady: input.validation?.valid === true,
    approvalReady: input.approval?.approved === true,
    reducerPreviewReady: input.reducerPreview?.ready === true,
    executionStatus,
    blockedReasons,
    warningCount: (input.policy?.warnings.length ?? 0) + (input.validation?.warnings.length ?? 0) + (input.result?.warnings.length ?? 0),
    nextSafeAction: blockedReasons.length > 0 ? "Review runtime event executor blockers." : "Review reducer preview, then execute only with explicit approval.",
    summary: [],
  };
  return { ...summary, summary: summarizeRuntimeEventExecutorSession(summary) };
}

export function summarizeRuntimeEventExecutorSession(summary: RuntimeEventExecutorSummary): string[] {
  return [
    `Guarded Runtime Event Executor status: ${summary.executionStatus}.`,
    summary.blockedReasons.length > 0 ? `Blocked reasons: ${summary.blockedReasons.join(", ")}.` : "Request, policy, validation, approval, and reducer preview can be reviewed locally.",
    `Next safe action: ${summary.nextSafeAction}`,
  ];
}
