import {
  sameApplyDiffExecutionGateStringSet,
  uniqueApplyDiffExecutionGateStrings,
  type ApplyExecutionApprovalState,
  type ApplyExecutionGateInput,
  type ApplyExecutionPolicyConfirmation,
} from "./apply-execution-gate-types";

function isCleanDryRunStatus(status: ApplyExecutionGateInput["dryRunStatus"]): boolean {
  return status === "dry-run-complete";
}

export function buildApplyExecutionPolicyConfirmation(
  input: ApplyExecutionGateInput,
  approvalState: ApplyExecutionApprovalState
): ApplyExecutionPolicyConfirmation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  const dryRunCleanEnough = isCleanDryRunStatus(input.dryRunStatus);
  const pseudoOnlyPatchBlocksExecution = input.patchSourceState === "pseudo-diff-only";
  const realPatchPresent = input.realPatchAvailabilityState !== "missing" && input.toolInputPreview.patch.trim().length > 0;
  const realPatchReviewed =
    input.realPatchAvailabilityState === "reviewed" && input.patchSourceState === "real-patch-reviewed";
  const targetFilesMatchApprovedPacket =
    sameApplyDiffExecutionGateStringSet(input.targetFiles, input.approvedTargetFiles) &&
    sameApplyDiffExecutionGateStringSet(input.targetFiles, approvalState.acknowledgedTargetFiles);
  const singleApplyDiffTargetCovered =
    input.targetFiles.length === 1 && input.toolInputPreview.path.trim() === input.targetFiles[0];
  const rollbackSatisfied = input.rollbackPlan.length > 0 && input.rollbackPosture === "acknowledged";
  const verificationSatisfied = input.verificationPlan.length > 0 && input.verificationPosture === "acknowledged";
  const highOrCriticalRiskRequiresExtraAcknowledgement = input.riskLevel === "high" || input.riskLevel === "critical";
  const highRiskAcknowledgementSatisfied =
    !highOrCriticalRiskRequiresExtraAcknowledgement || approvalState.highRiskExtraAcknowledged;

  if (!approvalState.satisfied) blockedReasons.push("Explicit operator approval required.");
  if (!dryRunCleanEnough) blockedReasons.push("Dry run must be clean enough before execution.");
  if (pseudoOnlyPatchBlocksExecution) blockedReasons.push("Pseudo-only patch blocks execution.");
  if (!realPatchPresent) blockedReasons.push("Real patch required before execution.");
  if (!realPatchReviewed) blockedReasons.push("Reviewed real patch required before execution.");
  if (!targetFilesMatchApprovedPacket) blockedReasons.push("Target files must match approved packet.");
  if (!singleApplyDiffTargetCovered) blockedReasons.push("Single apply-diff request must target exactly one approved file.");
  if (!rollbackSatisfied) blockedReasons.push("Rollback plan required.");
  if (!verificationSatisfied) blockedReasons.push("Verification plan required.");
  if (!highRiskAcknowledgementSatisfied) blockedReasons.push("High/critical risk acknowledgement required.");
  if (input.policyPosture === "blocked") blockedReasons.push("Policy posture blocks execution.");
  if (input.policyPosture === "unchecked") blockedReasons.push("Policy posture must be checked.");
  if (input.approvalPosture === "rejected") blockedReasons.push("Approval posture is rejected.");
  if (input.toolInputPreview.dryRun !== false) blockedReasons.push("Real apply request must explicitly set dryRun false.");

  if (input.policyPosture === "approval-required") warnings.push("apply-diff is approval-required.");
  warnings.push("broker-execution blocked.");
  warnings.push("write-file direct call blocked.");
  warnings.push("run-command direct call blocked.");

  const ready = blockedReasons.length === 0;

  return {
    id: `apply-diff-execution-policy:${input.id}`,
    executionGateId: input.id,
    toolName: "apply-diff",
    applyDiffApprovalRequired: true,
    approvalStateSatisfied: approvalState.satisfied,
    dryRunCleanEnough,
    pseudoOnlyPatchBlocksExecution,
    realPatchPresent,
    realPatchReviewed,
    targetFilesMatchApprovedPacket,
    singleApplyDiffTargetCovered,
    rollbackRequired: true,
    rollbackSatisfied,
    verificationRequired: true,
    verificationSatisfied,
    highOrCriticalRiskRequiresExtraAcknowledgement,
    highRiskAcknowledgementSatisfied,
    brokerExecutionBlocked: true,
    writeFileDirectCallBlocked: true,
    runCommandDirectCallBlocked: true,
    directApplyDiffCallBlocked: true,
    executeRouteOnlyAllowedBoundary: true,
    allowedBoundary: "/api/codexforge/tools/execute",
    blockedTools: ["broker-execution", "write-file", "run-command"],
    blockedReasons: uniqueApplyDiffExecutionGateStrings(blockedReasons),
    warnings: uniqueApplyDiffExecutionGateStrings(warnings),
    ready,
    summary: [
      ready ? "Apply execution policy is satisfied." : "Apply execution policy blocks dispatch.",
      "apply-diff is approval-required and may only cross the guarded execute route after approval.",
      "execute route is the only allowed future boundary.",
      "broker-execution, direct write-file, direct run-command, and direct apply-diff UI calls are blocked.",
    ],
  };
}

export function isApplyExecutionPolicySatisfied(policy: ApplyExecutionPolicyConfirmation): boolean {
  return (
    policy.ready &&
    policy.toolName === "apply-diff" &&
    policy.applyDiffApprovalRequired &&
    policy.approvalStateSatisfied &&
    policy.dryRunCleanEnough &&
    !policy.pseudoOnlyPatchBlocksExecution &&
    policy.realPatchPresent &&
    policy.realPatchReviewed &&
    policy.targetFilesMatchApprovedPacket &&
    policy.singleApplyDiffTargetCovered &&
    policy.rollbackSatisfied &&
    policy.verificationSatisfied &&
    policy.highRiskAcknowledgementSatisfied &&
    policy.brokerExecutionBlocked &&
    policy.writeFileDirectCallBlocked &&
    policy.runCommandDirectCallBlocked &&
    policy.directApplyDiffCallBlocked &&
    policy.executeRouteOnlyAllowedBoundary
  );
}

export function summarizeApplyExecutionPolicyConfirmation(policy: ApplyExecutionPolicyConfirmation): string[] {
  return [
    `Policy ${policy.id}: ready=${policy.ready}; tool=${policy.toolName}.`,
    policy.approvalStateSatisfied ? "Approval state satisfied." : "Policy blocks missing approval.",
    policy.pseudoOnlyPatchBlocksExecution ? "Policy blocks pseudo-only patch." : "Real patch is not pseudo-only.",
    policy.realPatchPresent ? "Real patch present." : "Policy blocks missing real patch.",
    "execute route is the guarded boundary.",
  ];
}
