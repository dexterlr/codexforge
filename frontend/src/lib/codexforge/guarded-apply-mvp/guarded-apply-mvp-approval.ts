import type { GuardedApplyMvpApproval, GuardedApplyMvpApprovalSource, GuardedApplyMvpRequest, GuardedApplyMvpValidation } from "./guarded-apply-mvp-types";

export function buildGuardedApplyMvpApproval(request: GuardedApplyMvpRequest, source: GuardedApplyMvpApprovalSource = {}): GuardedApplyMvpApproval {
  const expectedApprovalText = `APPROVE ${request.requestId} ${request.selectedFile ?? "missing-file"} ${request.diffLabel}`;
  const approvalText = source.approvalText?.trim() || "";
  const approvalBoundTo = `${source.requestId ?? request.requestId}:${source.selectedFile ?? request.selectedFile ?? "missing-file"}:${source.diffLabel ?? request.diffLabel}`;
  const blockedReasons: string[] = [];
  if (approvalText !== expectedApprovalText) blockedReasons.push("Exact approval required.");
  if (source.requestId && source.requestId !== request.requestId) blockedReasons.push("Approval invalidated if request changes.");
  if (source.selectedFile && source.selectedFile !== request.selectedFile) blockedReasons.push("Approval invalidated if file changes.");
  if (source.diffLabel && source.diffLabel !== request.diffLabel) blockedReasons.push("Approval invalidated if diff changes.");
  return {
    approved: blockedReasons.length === 0,
    approvalText,
    expectedApprovalText,
    approvalBoundTo,
    invalidatedIfRequestChanges: true,
    blockedReasons,
  };
}

export function validateGuardedApplyMvpApproval(approval: GuardedApplyMvpApproval): GuardedApplyMvpValidation {
  return { ok: approval.approved, blockedReasons: approval.blockedReasons, warnings: ["Approval remains separate from validation."] };
}
