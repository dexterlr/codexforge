import {
  buildRuntimeEventExecutorStableKey,
  type RuntimeEventExecutionResult,
  type RuntimeEventExecutorStatus,
} from "./runtime-event-executor-types";

export function buildRuntimeEventExecutionResult(input: {
  requestId: string;
  ok: boolean;
  status: RuntimeEventExecutorStatus;
  eventType: string;
  eventId?: string;
  appendedEventPreview?: RuntimeEventExecutionResult["appendedEventPreview"];
  appendedEventResult?: RuntimeEventExecutionResult["appendedEventResult"];
  reducerPreviewSummary?: string[];
  warnings?: string[];
  errors?: string[];
  nextSafeAction?: string;
  reviewRefs?: string[];
}): RuntimeEventExecutionResult {
  const result: RuntimeEventExecutionResult = {
    id: buildRuntimeEventExecutorStableKey("runtime-event-result", input.requestId, input.status, input.eventId),
    requestId: input.requestId,
    ok: input.ok,
    status: input.status,
    eventType: input.eventType,
    eventId: input.eventId,
    appendedEventPreview: input.appendedEventPreview,
    appendedEventResult: input.appendedEventResult,
    reducerPreviewSummary: input.reducerPreviewSummary ?? [],
    warnings: input.warnings ?? [],
    errors: input.errors ?? [],
    nextSafeAction: input.nextSafeAction ?? "Review runtime event executor result.",
    reviewRefs: input.reviewRefs ?? [],
    summary: [],
  };
  return normalizeRuntimeEventExecutionResult(result);
}

export function normalizeRuntimeEventExecutionResult(result: RuntimeEventExecutionResult): RuntimeEventExecutionResult {
  const ok = result.status === "executed" ? Boolean(result.appendedEventResult) && result.ok : result.ok;
  const normalized = {
    ...result,
    ok,
    warnings: Array.from(new Set(result.warnings)),
    errors: Array.from(new Set(result.errors)),
  };
  return { ...normalized, summary: summarizeRuntimeEventExecutionResult(normalized) };
}

export function summarizeRuntimeEventExecutionResult(result: RuntimeEventExecutionResult): string[] {
  return [
    `${result.eventType} execution status: ${result.status}.`,
    result.ok ? "Result is ok." : `Result is not ok: ${result.errors.join(", ") || result.nextSafeAction}`,
    result.status === "executed" ? "Event was appended through the executor boundary." : "No executed success is fabricated without an appended event result.",
  ];
}
