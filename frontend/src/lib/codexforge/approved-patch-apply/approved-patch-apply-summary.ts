import {
  buildApprovedPatchApplyStableId,
  type ApprovedPatchApplyApprovalPacket,
  type ApprovedPatchApplyDryRunPreview,
  type ApprovedPatchApplyExecutionBridge,
  type ApprovedPatchApplyPolicy,
  type ApprovedPatchApplyPreflight,
  type ApprovedPatchApplyRequest,
  type ApprovedPatchApplyRollbackPlan,
  type ApprovedPatchApplySummary,
  type ApprovedPatchApplyValidationCapture,
} from "./approved-patch-apply-types";
import { isApprovedPatchApplyAllowed } from "./apply-policy";

export function buildApprovedPatchApplySummary(args: {
  request: ApprovedPatchApplyRequest;
  approvalPacket: ApprovedPatchApplyApprovalPacket;
  policy: ApprovedPatchApplyPolicy;
  preflight: ApprovedPatchApplyPreflight;
  dryRunPreview: ApprovedPatchApplyDryRunPreview;
  rollbackPlan: ApprovedPatchApplyRollbackPlan;
  validationCapture: ApprovedPatchApplyValidationCapture;
  executionBridge: ApprovedPatchApplyExecutionBridge;
}): ApprovedPatchApplySummary {
  const requestReady = args.request.validation.valid;
  const approvalReady = args.approvalPacket.readyForPolicy;
  const policyReady = isApprovedPatchApplyAllowed(args.policy);
  const nextSafeAction = policyReady
    ? "Review request-ready approved patch apply packet, then copy validation checklist."
    : "Resolve approval, policy, preflight, dry-run, rollback, or validation blockers.";
  const summary: ApprovedPatchApplySummary = {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-summary", args.request.requestId, args.executionBridge.status),
    requestReady,
    approvalReady,
    policyReady,
    preflightStatus: args.preflight.overallStatus,
    dryRunStatus: args.dryRunPreview.status,
    rollbackReady: args.rollbackPlan.ready,
    validationCommandCount: args.validationCapture.commands.length,
    executionStatus: args.executionBridge.status,
    nextSafeAction,
    summary: [],
  };

  return {
    ...summary,
    summary: summarizeApprovedPatchApplySession(summary),
  };
}

export function summarizeApprovedPatchApplySession(summary: ApprovedPatchApplySummary): string[] {
  return [
    `Approved Patch Apply: request ready=${summary.requestReady}, approval ready=${summary.approvalReady}, policy ready=${summary.policyReady}.`,
    `Preflight=${summary.preflightStatus}; dry-run=${summary.dryRunStatus}; rollback ready=${summary.rollbackReady}.`,
    `${summary.validationCommandCount} validation command(s); execution status=${summary.executionStatus}.`,
    `Next safe action: ${summary.nextSafeAction}`,
  ];
}
