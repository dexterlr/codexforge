import { appendEvent } from "@/lib/codexforge/brain/runtime/event-store";
import type { CodexForgeBrainRuntimeEventInput } from "@/lib/codexforge/brain/runtime/runtime-types";
import { validateRuntimeEventApproval } from "./runtime-event-approval";
import {
  buildRuntimeEventExecutorStableKey,
  deriveRuntimeEventTimestamp,
  type RuntimeEventExecutionResult,
  type RuntimeEventExecutorInput,
  type RuntimeEventPayloadValidation,
  type RuntimeEventRequest,
} from "./runtime-event-executor-types";
import { buildRuntimeEventPolicy } from "./runtime-event-policy";
import { buildRuntimeEventExecutionResult } from "./runtime-event-result";
import { validateRuntimeEventPayload } from "./runtime-event-validation";

function buildEventInput(request: RuntimeEventRequest, validation: RuntimeEventPayloadValidation): CodexForgeBrainRuntimeEventInput | null {
  if (request.requestedEventType !== "memory.promoted" || !validation.normalizedPayload) return null;
  return {
    id: buildRuntimeEventExecutorStableKey("event", request.requestedEventType, request.id),
    type: "memory.promoted",
    ts: deriveRuntimeEventTimestamp(request.id),
    actor: "runtime",
    source: { type: "manual", id: request.sourceGateId, label: request.sourceSurface },
    payload: validation.normalizedPayload,
    metadata: {
      requestId: request.id,
      appendOnlyBoundary: "guarded runtime event executor boundary",
    },
  };
}

export function executeRuntimeEventDryRun(input: RuntimeEventExecutorInput): RuntimeEventExecutionResult {
  const validation = input.validation ?? validateRuntimeEventPayload(input.request.requestedEventType, input.request.requestedPayload);
  const eventInput = buildEventInput(input.request, validation);
  if (!eventInput && !validation.valid) {
    return buildRuntimeEventExecutionResult({
      requestId: input.request.id,
      ok: false,
      status: "validation-failed",
      eventType: input.request.requestedEventType,
      reducerPreviewSummary: input.reducerPreview?.summary,
      warnings: validation.warnings,
      errors: validation.blockedReasons,
      nextSafeAction: "Fix runtime event payload before dry-run preview.",
      reviewRefs: input.request.evidenceRefs,
    });
  }

  return buildRuntimeEventExecutionResult({
    requestId: input.request.id,
    ok: true,
    status: "dry-run-complete",
    eventType: input.request.requestedEventType,
    eventId: eventInput?.id,
    appendedEventPreview: eventInput ?? undefined,
    reducerPreviewSummary: input.reducerPreview?.summary,
    warnings: validation.warnings,
    nextSafeAction: "Review approval, policy, and reducer preview before execution.",
    reviewRefs: input.request.evidenceRefs,
  });
}

export function executeApprovedRuntimeEvent(input: RuntimeEventExecutorInput): RuntimeEventExecutionResult {
  const validation = input.validation ?? validateRuntimeEventPayload(input.request.requestedEventType, input.request.requestedPayload);
  if (!validation.valid) {
    return buildRuntimeEventExecutionResult({
      requestId: input.request.id,
      ok: false,
      status: "validation-failed",
      eventType: input.request.requestedEventType,
      reducerPreviewSummary: input.reducerPreview?.summary,
      warnings: validation.warnings,
      errors: validation.blockedReasons,
      nextSafeAction: "Correct payload validation blockers.",
      reviewRefs: input.request.evidenceRefs,
    });
  }

  const approvalBlocked = validateRuntimeEventApproval(input.request, input.approval);
  if (approvalBlocked.length > 0) {
    return buildRuntimeEventExecutionResult({
      requestId: input.request.id,
      ok: false,
      status: "approval-required",
      eventType: input.request.requestedEventType,
      reducerPreviewSummary: input.reducerPreview?.summary,
      warnings: validation.warnings,
      errors: approvalBlocked,
      nextSafeAction: "Collect explicit runtime event approval.",
      reviewRefs: input.request.evidenceRefs,
    });
  }

  const policy = input.policy ?? buildRuntimeEventPolicy({ request: input.request, approval: input.approval, validation });
  if (!policy.allowed) {
    return buildRuntimeEventExecutionResult({
      requestId: input.request.id,
      ok: false,
      status: "policy-blocked",
      eventType: input.request.requestedEventType,
      reducerPreviewSummary: input.reducerPreview?.summary,
      warnings: [...policy.warnings, ...validation.warnings],
      errors: policy.blockedReasons,
      nextSafeAction: "Resolve policy blockers before runtime append.",
      reviewRefs: input.request.evidenceRefs,
    });
  }

  const eventInput = buildEventInput(input.request, validation);
  if (!eventInput) {
    return buildRuntimeEventExecutionResult({
      requestId: input.request.id,
      ok: false,
      status: "blocked",
      eventType: input.request.requestedEventType,
      reducerPreviewSummary: input.reducerPreview?.summary,
      errors: ["executor has no append mapping for this event type"],
      nextSafeAction: "Keep request-ready until executor mapping is implemented.",
      reviewRefs: input.request.evidenceRefs,
    });
  }

  try {
    const appendedEventResult = input.store ? appendEvent(input.store, eventInput) : appendEvent(eventInput);
    return buildRuntimeEventExecutionResult({
      requestId: input.request.id,
      ok: true,
      status: "executed",
      eventType: input.request.requestedEventType,
      eventId: appendedEventResult.event.id,
      appendedEventPreview: eventInput,
      appendedEventResult,
      reducerPreviewSummary: input.reducerPreview?.summary,
      warnings: policy.warnings,
      nextSafeAction: "Capture result and inspect reducer output before UI graph refresh.",
      reviewRefs: input.request.evidenceRefs,
    });
  } catch (error) {
    return buildRuntimeEventExecutionResult({
      requestId: input.request.id,
      ok: false,
      status: "failed",
      eventType: input.request.requestedEventType,
      eventId: eventInput.id,
      appendedEventPreview: eventInput,
      reducerPreviewSummary: input.reducerPreview?.summary,
      errors: [error instanceof Error ? error.message : "runtime append failed"],
      nextSafeAction: "Review executor failure before retry.",
      reviewRefs: input.request.evidenceRefs,
    });
  }
}

export function summarizeRuntimeEventExecution(result: RuntimeEventExecutionResult): string[] {
  return result.summary;
}
