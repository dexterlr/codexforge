import {
  buildApprovedPatchApplyStableId,
  isApprovedPatchApplyHighRisk,
  type ApprovedPatchApplyPolicy,
  type ApprovedPatchApplyPolicySource,
} from "./approved-patch-apply-types";

export function buildApprovedPatchApplyPolicy(source: ApprovedPatchApplyPolicySource): ApprovedPatchApplyPolicy {
  const request = source.request ?? null;
  const approval = source.approvalPacket ?? null;
  const preflight = source.preflight ?? null;
  const dryRun = source.dryRunPreview ?? null;
  const rollback = source.rollbackPlan ?? null;
  const validation = source.validationCapture ?? null;
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  const highOrCriticalRiskRequiresExtraAcknowledgement = request ? isApprovedPatchApplyHighRisk(request.riskLevel) : false;

  if (!request?.previewDiff) blockedReasons.push("Policy blocks missing preview diff.");
  if (!request?.selectedFilePath) blockedReasons.push("Policy blocks missing selected file path.");
  if (!request?.validation.valid) blockedReasons.push("Policy blocks invalid apply request.");
  if (!approval?.approved) blockedReasons.push("Policy blocks missing approval.");
  if (approval && approval.missingAcknowledgements.includes("preview diff acknowledgement required")) {
    blockedReasons.push("Policy requires preview diff acknowledgement.");
  }
  if (highOrCriticalRiskRequiresExtraAcknowledgement && !approval?.highRiskExtraAcknowledged) {
    blockedReasons.push("Policy requires high/critical risk extra acknowledgement.");
  }
  if (!rollback?.ready) blockedReasons.push("Policy requires rollback plan.");
  if (!validation?.ready || validation.commands.length < 1) blockedReasons.push("Policy requires validation plan.");
  if (!preflight || preflight.overallStatus === "blocker" || preflight.blockerCount > 0) {
    blockedReasons.push("Policy requires preflight to pass.");
  }
  if (!dryRun || dryRun.status === "blocker") {
    blockedReasons.push("Policy requires dry-run/preflight before apply.");
  }
  if (source.directUiApplyDiffAttempted === true) blockedReasons.push("Policy blocks direct UI apply-diff.");
  if (source.directUiWriteFileAttempted === true) blockedReasons.push("Policy blocks direct UI write-file.");
  if (source.commandExecutionFromUiAttempted === true) blockedReasons.push("Policy blocks command execution from UI.");
  if (source.brokerExecutionAttempted === true) blockedReasons.push("Policy blocks broker execution.");
  if (source.cleanWorkingTree === false) warnings.push("Clean working tree recommended before apply.");
  if (dryRun?.status === "warning") warnings.push("Dry-run preview has warnings; operator review required before guarded apply.");
  if (preflight?.overallStatus === "risk") warnings.push("Preflight risk check requires acknowledgement before apply.");

  const uniqueBlockedReasons = Array.from(new Set(blockedReasons)).sort();
  const uniqueWarnings = Array.from(new Set(warnings)).sort();
  const allowed = uniqueBlockedReasons.length === 0;
  const requestReady = allowed && request?.requestedApplyMode !== "preview-only";
  const nextSafeAction = allowed
    ? "Request-ready; review guarded apply bridge and copy validation checklist."
    : "Resolve blocked reasons before any guarded apply request.";

  const policy: ApprovedPatchApplyPolicy = {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-policy", request?.requestId ?? "missing-request", String(allowed)),
    allowed,
    requestReady,
    previewDiffRequired: true,
    selectedFilePathRequired: true,
    cleanWorkingTreeRecommended: true,
    explicitApprovalRequired: true,
    rollbackPlanRequired: true,
    validationPlanRequired: true,
    preflightMustPass: true,
    dryRunPreflightRequiredBeforeApply: true,
    highOrCriticalRiskRequiresExtraAcknowledgement,
    applyDiffGuardedBridgeOnly: true,
    directUiApplyDiffCallBlocked: true,
    directUiWriteFileCallBlocked: true,
    commandExecutionFromUiBlocked: true,
    brokerExecutionBlocked: true,
    latestMessageAuthorityPreserved: true,
    blockedReasons: uniqueBlockedReasons,
    warnings: uniqueWarnings,
    nextSafeAction,
    summary: [],
  };

  return {
    ...policy,
    summary: summarizeApprovedPatchApplyPolicy(policy),
  };
}

export function isApprovedPatchApplyAllowed(policy: ApprovedPatchApplyPolicy): boolean {
  return policy.allowed && policy.requestReady && policy.blockedReasons.length === 0;
}

export function summarizeApprovedPatchApplyPolicy(policy: ApprovedPatchApplyPolicy): string[] {
  return [
    `Policy allowed=${policy.allowed}; requestReady=${policy.requestReady}.`,
    `${policy.blockedReasons.length} blocked reason(s), ${policy.warnings.length} warning(s).`,
    "apply-diff can only be called inside guarded bridge/API boundary; direct UI apply-diff, direct UI write-file, command execution from UI, and broker execution are blocked.",
    "Latest-message authority preserved.",
    `Next safe action: ${policy.nextSafeAction}`,
  ];
}
