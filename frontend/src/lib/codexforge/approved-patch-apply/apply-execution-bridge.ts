import {
  buildApprovedPatchApplyStableId,
  type ApprovedPatchApplyApprovalPacket,
  type ApprovedPatchApplyDryRunPreview,
  type ApprovedPatchApplyExecutionBridge,
  type ApprovedPatchApplyExecutionResult,
  type ApprovedPatchApplyExecutionStatus,
  type ApprovedPatchApplyPolicy,
  type ApprovedPatchApplyPreflight,
  type ApprovedPatchApplyRequest,
  type ApprovedPatchApplyRollbackPlan,
  type ApprovedPatchApplyValidationCapture,
} from "./approved-patch-apply-types";
import { isApprovedPatchApplyAllowed } from "./apply-policy";

export type ApprovedPatchApplyGuardedApplyHandler = (input: {
  request: ApprovedPatchApplyRequest;
  approvalPacket: ApprovedPatchApplyApprovalPacket;
  policy: ApprovedPatchApplyPolicy;
  preflight: ApprovedPatchApplyPreflight;
  dryRunPreview: ApprovedPatchApplyDryRunPreview;
  rollbackPlan: ApprovedPatchApplyRollbackPlan;
  validationCapture: ApprovedPatchApplyValidationCapture;
}) => Promise<{
  applied: boolean;
  changedFiles?: string[];
  warnings?: string[];
  errors?: string[];
}>;

function statusFromInputs(args: {
  approvalPacket: ApprovedPatchApplyApprovalPacket;
  policy: ApprovedPatchApplyPolicy;
  preflight: ApprovedPatchApplyPreflight;
  dryRunPreview: ApprovedPatchApplyDryRunPreview;
  guardedApiAvailable: boolean;
}): ApprovedPatchApplyExecutionStatus {
  if (!args.approvalPacket.approved) return "approval-required";
  if (!isApprovedPatchApplyAllowed(args.policy)) return "policy-blocked";
  if (args.preflight.overallStatus === "blocker") return "preflight-failed";
  if (args.dryRunPreview.status === "blocker") return "preflight-failed";
  if (args.dryRunPreview.status === "warning") return "dry-run-warning";
  if (!args.guardedApiAvailable) return "request-ready";
  return "request-ready";
}

function bridgeBlockedReasons(args: {
  status: ApprovedPatchApplyExecutionStatus;
  approvalPacket: ApprovedPatchApplyApprovalPacket;
  policy: ApprovedPatchApplyPolicy;
  preflight: ApprovedPatchApplyPreflight;
  dryRunPreview: ApprovedPatchApplyDryRunPreview;
  guardedApiAvailable: boolean;
}): string[] {
  const blocked: string[] = [];
  if (args.status === "approval-required") blocked.push("Explicit approval required.");
  if (args.policy.blockedReasons.length > 0) blocked.push(...args.policy.blockedReasons);
  if (args.preflight.blockerCount > 0) blocked.push("Preflight failed.");
  if (args.dryRunPreview.status === "blocker") blocked.push("Dry-run preview blocked.");
  if (!args.guardedApiAvailable) blocked.push("request-ready; apply execution blocked until guarded API is available.");
  if (args.approvalPacket.missingAcknowledgements.length > 0) blocked.push(...args.approvalPacket.missingAcknowledgements);
  return Array.from(new Set(blocked)).sort();
}

export function buildApprovedPatchApplyExecutionBridge(args: {
  request: ApprovedPatchApplyRequest;
  approvalPacket: ApprovedPatchApplyApprovalPacket;
  policy: ApprovedPatchApplyPolicy;
  preflight: ApprovedPatchApplyPreflight;
  dryRunPreview: ApprovedPatchApplyDryRunPreview;
  rollbackPlan: ApprovedPatchApplyRollbackPlan;
  validationCapture: ApprovedPatchApplyValidationCapture;
  guardedApiAvailable?: boolean | null;
}): ApprovedPatchApplyExecutionBridge {
  const guardedApiAvailable = args.guardedApiAvailable === true;
  const status = statusFromInputs({
    approvalPacket: args.approvalPacket,
    policy: args.policy,
    preflight: args.preflight,
    dryRunPreview: args.dryRunPreview,
    guardedApiAvailable,
  });
  const blockedReasons = bridgeBlockedReasons({
    status,
    approvalPacket: args.approvalPacket,
    policy: args.policy,
    preflight: args.preflight,
    dryRunPreview: args.dryRunPreview,
    guardedApiAvailable,
  });
  const canRequestApply =
    guardedApiAvailable &&
    status === "request-ready" &&
    isApprovedPatchApplyAllowed(args.policy) &&
    args.approvalPacket.readyForPolicy &&
    args.preflight.blockerCount === 0 &&
    args.dryRunPreview.status === "pass";
  const requestBodyPreview = canRequestApply
    ? {
        approved: true,
        approvalPacketId: args.approvalPacket.approvalPacketId,
        applyRequestId: args.request.requestId,
        selectedFilePath: args.request.selectedFilePath,
        previewDiffDigest: args.request.previewDiffDigest,
        touchedFiles: args.request.expectedTouchedFiles,
        dryRunRequired: true,
        rollbackPlanId: args.rollbackPlan.id,
        validationCommandCount: args.validationCapture.commands.length,
      }
    : null;
  const bridge: ApprovedPatchApplyExecutionBridge = {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-execution-bridge", args.request.requestId, status, String(guardedApiAvailable)),
    requestId: args.request.requestId,
    status,
    boundary: "guarded-bridge",
    guardedApiAvailable,
    canRequestApply,
    blockedReasons,
    safetyNotes: [
      "execution bridge does not execute on render",
      "execution bridge does not execute on module load",
      "UI must not call apply-diff directly",
      "UI must not write files directly",
      "UI must not run commands or tests",
      "Brain graph and memory are not mutated",
    ],
    requestBodyPreview,
    summary: [],
  };

  return {
    ...bridge,
    summary: summarizeApprovedPatchApplyExecutionBridge(bridge),
  };
}

export async function executeApprovedPatchApplyRequest(args: {
  request: ApprovedPatchApplyRequest;
  approvalPacket: ApprovedPatchApplyApprovalPacket;
  policy: ApprovedPatchApplyPolicy;
  preflight: ApprovedPatchApplyPreflight;
  dryRunPreview: ApprovedPatchApplyDryRunPreview;
  rollbackPlan: ApprovedPatchApplyRollbackPlan;
  validationCapture: ApprovedPatchApplyValidationCapture;
  guardedApplyHandler?: ApprovedPatchApplyGuardedApplyHandler | null;
}): Promise<ApprovedPatchApplyExecutionResult> {
  const bridge = buildApprovedPatchApplyExecutionBridge({
    ...args,
    guardedApiAvailable: Boolean(args.guardedApplyHandler),
  });

  if (!args.approvalPacket.approved) {
    return buildExecutionResult(args.request.requestId, "approval-required", false, [], bridge.blockedReasons, []);
  }

  if (!isApprovedPatchApplyAllowed(args.policy)) {
    return buildExecutionResult(args.request.requestId, "policy-blocked", false, [], bridge.blockedReasons, args.policy.warnings);
  }

  if (args.preflight.blockerCount > 0) {
    return buildExecutionResult(args.request.requestId, "preflight-failed", false, [], bridge.blockedReasons, []);
  }

  if (args.dryRunPreview.status === "warning") {
    return buildExecutionResult(args.request.requestId, "dry-run-warning", false, [], bridge.blockedReasons, args.dryRunPreview.summary);
  }

  if (!args.guardedApplyHandler) {
    return buildExecutionResult(args.request.requestId, "request-ready", false, [], bridge.blockedReasons, [
      "request-ready; apply execution blocked until guarded API is available.",
    ]);
  }

  try {
    const result = await args.guardedApplyHandler(args);
    return buildExecutionResult(
      args.request.requestId,
      result.applied ? "applied" : "failed",
      result.applied,
      result.changedFiles ?? [],
      result.errors ?? [],
      result.warnings ?? []
    );
  } catch (error) {
    return buildExecutionResult(args.request.requestId, "failed", false, [], [
      error instanceof Error ? error.message : "Guarded apply handler failed.",
    ], []);
  }
}

function buildExecutionResult(
  requestId: string,
  status: ApprovedPatchApplyExecutionStatus,
  applied: boolean,
  changedFiles: string[],
  errors: string[],
  warnings: string[]
): ApprovedPatchApplyExecutionResult {
  const result: ApprovedPatchApplyExecutionResult = {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-execution-result", requestId, status, String(applied)),
    requestId,
    status,
    applied,
    changedFiles,
    errors,
    warnings,
    summary: [],
  };

  return {
    ...result,
    summary: [
      `Execution status ${status}; applied=${applied}.`,
      applied ? "Guarded apply reported applied success." : "No applied success is claimed.",
      `${changedFiles.length} changed file(s), ${errors.length} error(s), ${warnings.length} warning(s).`,
    ],
  };
}

export function summarizeApprovedPatchApplyExecutionBridge(
  bridge: ApprovedPatchApplyExecutionBridge
): string[] {
  return [
    `Execution bridge status ${bridge.status}; canRequestApply=${bridge.canRequestApply}.`,
    bridge.guardedApiAvailable
      ? "Guarded API boundary is available for explicit request."
      : "request-ready; apply execution blocked until guarded API is available.",
    `${bridge.blockedReasons.length} bridge blocked reason(s).`,
    "No execute on render, no execute on module load, no direct UI apply-diff, no command execution, no tests, and no Brain graph mutation.",
  ];
}
