import {
  RUNTIME_EVENT_EXECUTOR_ALLOWED_EVENT_TYPES,
  RUNTIME_EVENT_EXECUTOR_FUTURE_EVENT_TYPES,
  buildRuntimeEventExecutorStableKey,
  type RuntimeEventApproval,
  type RuntimeEventPayloadValidation,
  type RuntimeEventPolicy,
  type RuntimeEventRequest,
} from "./runtime-event-executor-types";
import { validateRuntimeEventApproval } from "./runtime-event-approval";
import { validateRuntimeEventPayload } from "./runtime-event-validation";

export function buildRuntimeEventPolicy(input: {
  request?: RuntimeEventRequest;
  approval?: RuntimeEventApproval;
  validation?: RuntimeEventPayloadValidation;
  directUiGraphMutationAttempted?: boolean;
  directAppendEventFromUiAttempted?: boolean;
}): RuntimeEventPolicy {
  const request = input.request;
  const validation = input.validation ?? (request ? validateRuntimeEventPayload(request.requestedEventType, request.requestedPayload) : undefined);
  const approvalBlocked = request ? validateRuntimeEventApproval(request, input.approval) : ["event request required"];
  const eventTypeAllowed = request ? RUNTIME_EVENT_EXECUTOR_ALLOWED_EVENT_TYPES.includes(request.requestedEventType as "memory.promoted") : false;
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!request) blockedReasons.push("event request required");
  if (request && !eventTypeAllowed) blockedReasons.push("unknown event type blocked");
  if (validation && !validation.valid) blockedReasons.push(...validation.blockedReasons);
  if (approvalBlocked.length > 0) blockedReasons.push(...approvalBlocked);
  if (request?.requestedEventType === "memory.promoted" && request.evidenceRefs.length === 0) blockedReasons.push("source evidence required for memory.promoted");
  if (request?.requestedEventType === "memory.promoted" && !request.reviewedInboxOrMemoryGate) blockedReasons.push("memory.promoted requires reviewed inbox/memory gate");
  if (input.directUiGraphMutationAttempted) blockedReasons.push("direct UI graph mutation blocked");
  if (input.directAppendEventFromUiAttempted) blockedReasons.push("direct appendEvent from UI blocked");
  if (request?.duplicateRiskAcknowledgementRequired) warnings.push("duplicate risk requires acknowledgement");
  if (request?.contradictionRiskAcknowledgementRequired) warnings.push("contradiction risk requires acknowledgement");
  warnings.push("event reducer preview recommended before execution");
  warnings.push("evidence is context, not authority");

  const policy: RuntimeEventPolicy = {
    id: buildRuntimeEventExecutorStableKey("runtime-event-policy", request?.id ?? "missing"),
    requestId: request?.id ?? "missing-request",
    allowed: blockedReasons.length === 0,
    eventTypeAllowed,
    explicitApprovalRequired: true,
    payloadValidationRequired: true,
    reducerPreviewRecommended: true,
    directUiGraphMutationBlocked: true,
    directAppendEventFromUiBlocked: true,
    evidenceIsContextNotAuthority: true,
    latestMessageAuthorityPreserved: true,
    allowedEventTypes: [...RUNTIME_EVENT_EXECUTOR_ALLOWED_EVENT_TYPES],
    futureSupportedEventTypes: [...RUNTIME_EVENT_EXECUTOR_FUTURE_EVENT_TYPES],
    blockedReasons: Array.from(new Set(blockedReasons)),
    warnings: Array.from(new Set(warnings)),
    rules: [],
    summary: [],
  };

  policy.rules = [
    { id: "request-required", label: "event request required", state: request ? "allow" : "block", detail: "Executor requires a deterministic request packet." },
    { id: "approval-required", label: "explicit approval required", state: approvalBlocked.length === 0 ? "allow" : "block", detail: "Operator approval must acknowledge reducer and append-only effects." },
    { id: "event-type-allowed", label: "event type must be allowed", state: eventTypeAllowed ? "allow" : "block", detail: "Initial executor support is memory.promoted only." },
    { id: "payload-valid", label: "payload must validate", state: validation?.valid ? "allow" : "block", detail: "Runtime payload validation must pass before append." },
    { id: "ui-mutation-blocked", label: "direct UI graph mutation blocked", state: input.directUiGraphMutationAttempted ? "block" : "allow", detail: "UI may preview and request only." },
    { id: "append-from-ui-blocked", label: "direct appendEvent from UI blocked", state: input.directAppendEventFromUiAttempted ? "block" : "allow", detail: "appendEvent is only allowed inside executor boundary." },
    { id: "reducer-preview", label: "event reducer preview recommended before execution", state: "review", detail: "Preview is advisory and does not mutate the original graph." },
  ];

  return { ...policy, summary: summarizeRuntimeEventPolicy(policy) };
}

export function isRuntimeEventAllowed(policy: RuntimeEventPolicy): boolean {
  return policy.allowed;
}

export function summarizeRuntimeEventPolicy(policy: RuntimeEventPolicy): string[] {
  return [
    policy.allowed ? "Runtime event policy allows execution." : `Runtime event policy blocks execution: ${policy.blockedReasons.join(", ")}.`,
    "Only memory.promoted can pass initial policy; future event types remain blocked until approval and policy support exist.",
    "Direct UI graph mutation and direct appendEvent from UI are blocked.",
  ];
}
