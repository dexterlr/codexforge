import {
  buildRuntimeEventExecutorStableKey,
  type RuntimeEventApproval,
  type RuntimeEventApprovalInput,
  type RuntimeEventRequest,
} from "./runtime-event-executor-types";

export function buildRuntimeEventApproval(
  request: RuntimeEventRequest,
  input: RuntimeEventApprovalInput = {}
): RuntimeEventApproval {
  const approval: RuntimeEventApproval = {
    id: buildRuntimeEventExecutorStableKey("runtime-event-approval", request.id, input.approved === true ? "approved" : "pending"),
    requestId: request.id,
    approved: input.approved === true,
    approvalNote: input.approvalNote?.trim() ?? "",
    acknowledgedEventType: input.acknowledgedEventType ?? request.requestedEventType,
    acknowledgedReducerEffect: input.acknowledgedReducerEffect === true,
    acknowledgedEvidenceContext: input.acknowledgedEvidenceContext === true,
    acknowledgedDuplicateRisk: input.acknowledgedDuplicateRisk === true,
    acknowledgedContradictionRisks: input.acknowledgedContradictionRisks === true,
    acknowledgedNoSilentGraphMutation: input.acknowledgedNoSilentGraphMutation === true,
    acknowledgedAppendOnlyEventSemantics: input.acknowledgedAppendOnlyEventSemantics === true,
    summary: [],
  };
  return { ...approval, summary: summarizeRuntimeEventApproval(approval) };
}

export function validateRuntimeEventApproval(request: RuntimeEventRequest, approval?: RuntimeEventApproval): string[] {
  const blockedReasons: string[] = [];
  if (!approval) return ["approval required"];
  if (approval.requestId !== request.id) blockedReasons.push("approval request id mismatch");
  if (!approval.approved) blockedReasons.push("explicit approval required");
  if (approval.acknowledgedEventType !== request.requestedEventType) blockedReasons.push("acknowledged event type mismatch");
  if (!approval.acknowledgedReducerEffect) blockedReasons.push("acknowledged reducer effect required");
  if (!approval.acknowledgedEvidenceContext) blockedReasons.push("acknowledged evidence context required");
  if (request.duplicateRiskAcknowledgementRequired && !approval.acknowledgedDuplicateRisk) blockedReasons.push("duplicate risk requires acknowledgement");
  if (request.contradictionRiskAcknowledgementRequired && !approval.acknowledgedContradictionRisks) blockedReasons.push("contradiction risk requires acknowledgement");
  if (!approval.acknowledgedNoSilentGraphMutation) blockedReasons.push("acknowledged no silent graph mutation required");
  if (!approval.acknowledgedAppendOnlyEventSemantics) blockedReasons.push("acknowledged append-only event semantics required");
  return blockedReasons;
}

export function summarizeRuntimeEventApproval(approval: RuntimeEventApproval): string[] {
  return [
    approval.approved ? "Runtime event approval is explicit." : "Runtime event approval defaults to false.",
    "Approval covers event type, reducer effect, evidence context, duplicate/contradiction risks, no silent graph mutation, and append-only event semantics.",
  ];
}
