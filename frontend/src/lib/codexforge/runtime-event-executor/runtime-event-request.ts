import {
  buildRuntimeEventExecutorDigest,
  buildRuntimeEventExecutorStableKey,
  type RuntimeEventRequest,
  type RuntimeEventRequestInput,
  type RuntimeEventRequestValidation,
} from "./runtime-event-executor-types";

function cleanList(values: readonly string[] | undefined): string[] {
  return Array.from(new Set((values ?? []).map((item) => item.trim()).filter(Boolean))).sort();
}

export function buildRuntimeEventRequest(input: RuntimeEventRequestInput): RuntimeEventRequest {
  const payloadDigest = buildRuntimeEventExecutorDigest(input.requestedPayload);
  const id = buildRuntimeEventExecutorStableKey(
    "runtime-event-request",
    input.sourceGateId,
    input.requestedEventType,
    payloadDigest
  );
  const request: RuntimeEventRequest = {
    id,
    sourceGateId: input.sourceGateId.trim(),
    sourceSurface: input.sourceSurface.trim(),
    requestedEventType: input.requestedEventType,
    requestedPayload: { ...input.requestedPayload },
    targetRuntimeBoundary: "guarded runtime event executor boundary",
    operatorIntent: input.operatorIntent?.trim() || "review runtime event executor request",
    evidenceRefs: cleanList(input.evidenceRefs),
    relatedRoutes: cleanList(input.relatedRoutes),
    relatedFiles: cleanList(input.relatedFiles),
    approvalPosture: input.approvalPosture ?? "pending",
    policyPosture: input.policyPosture ?? "unchecked",
    noDirectUiMutationGuarantee: true,
    duplicateRiskAcknowledgementRequired: input.duplicateRiskAcknowledgementRequired ?? false,
    contradictionRiskAcknowledgementRequired: input.contradictionRiskAcknowledgementRequired ?? false,
    reviewedInboxOrMemoryGate: input.reviewedInboxOrMemoryGate ?? false,
    summary: [],
  };
  return { ...request, summary: summarizeRuntimeEventRequest(request) };
}

export function validateRuntimeEventRequest(request: RuntimeEventRequest): RuntimeEventRequestValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!request.id.trim()) blockedReasons.push("request id required");
  if (!request.sourceGateId.trim()) blockedReasons.push("source gate id required");
  if (!request.sourceSurface.trim()) blockedReasons.push("source surface required");
  if (!request.requestedEventType) blockedReasons.push("requested event type required");
  if (!request.requestedPayload || typeof request.requestedPayload !== "object") {
    blockedReasons.push("requested payload object required");
  }
  if (!request.targetRuntimeBoundary.trim()) blockedReasons.push("target runtime boundary required");
  if (request.noDirectUiMutationGuarantee !== true) blockedReasons.push("no direct UI graph mutation guarantee required");
  if (request.requestedEventType === "memory.promoted" && request.evidenceRefs.length === 0) {
    blockedReasons.push("memory.promoted source evidence required");
  }
  if (request.requestedEventType === "memory.promoted" && !request.reviewedInboxOrMemoryGate) {
    blockedReasons.push("memory.promoted requires reviewed inbox or memory gate");
  }
  if (request.approvalPosture !== "approved") warnings.push("explicit approval is still required");
  if (request.policyPosture !== "allowed") warnings.push("policy check has not allowed this request yet");

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    summary: [
      blockedReasons.length === 0 ? "Runtime event request is structurally valid." : `Runtime event request is blocked: ${blockedReasons.join(", ")}.`,
      "Request building is deterministic and performs no graph writes, file reads, or UI-only schema mutation.",
    ],
  };
}

export function summarizeRuntimeEventRequest(request: RuntimeEventRequest): string[] {
  return [
    `${request.requestedEventType} request ${request.id} targets ${request.targetRuntimeBoundary}.`,
    `Evidence refs: ${request.evidenceRefs.length}; related routes: ${request.relatedRoutes.length}; related files: ${request.relatedFiles.length}.`,
    "No direct UI graph mutation guarantee is attached.",
  ];
}
