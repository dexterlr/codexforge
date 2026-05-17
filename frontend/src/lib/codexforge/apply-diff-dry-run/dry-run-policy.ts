import type { ApplyDiffDryRunInput, ApplyDiffDryRunPolicy } from "./apply-dry-run-types";
import { validateApplyDiffDryRunInput } from "./dry-run-input";

export function buildApplyDiffDryRunPolicy(input: ApplyDiffDryRunInput): ApplyDiffDryRunPolicy {
  const validation = validateApplyDiffDryRunInput(input);
  const blockedReasons = [...validation.blockedReasons];
  const warnings = [...validation.warnings];
  const lowConfidenceBlocksFutureApply = input.confidence < 0.5;
  const highOrCriticalRiskRequiresExtraReview = input.riskLevel === "high" || input.riskLevel === "critical";

  if (input.realPatchAvailabilityState !== "reviewed") {
    warnings.push("Real patch required for future apply; dry run remains simulation only.");
  }
  if (input.patchSourceState === "pseudo-diff-only") {
    warnings.push("Pseudo diff can only simulate intent and must be refused for real apply.");
  }
  if (lowConfidenceBlocksFutureApply) {
    blockedReasons.push("Low confidence blocks future apply.");
  }
  if (highOrCriticalRiskRequiresExtraReview && !input.highRiskExtraReviewAcknowledged) {
    blockedReasons.push("High/critical risk requires extra review.");
  }
  if (input.policyPosture === "blocked") blockedReasons.push("Policy posture blocks dry run readiness.");
  if (input.policyPosture === "unchecked") blockedReasons.push("Policy posture must be checked.");

  return {
    id: `apply-diff-dry-run-policy:${input.id}`,
    dryRunId: input.id,
    allowed: blockedReasons.length === 0,
    validApplyGateInputRequired: true,
    explicitApprovalPacketRequired: true,
    currentFileVerificationAcknowledgementRequired: true,
    rollbackPlanRequired: true,
    verificationPlanRequired: true,
    realPatchRequiredForFutureApply: true,
    pseudoDiffCanOnlySimulateIntent: true,
    actualMutationBlocked: true,
    realApplyDiffCallBlocked: true,
    writeFileBlocked: true,
    runCommandBlocked: true,
    brokerExecutionBlocked: true,
    lowConfidenceBlocksFutureApply,
    highOrCriticalRiskRequiresExtraReview,
    blockedReasons,
    warnings,
    summary: summarizeApplyDiffDryRunPolicy({
      id: `apply-diff-dry-run-policy:${input.id}`,
      dryRunId: input.id,
      allowed: blockedReasons.length === 0,
      validApplyGateInputRequired: true,
      explicitApprovalPacketRequired: true,
      currentFileVerificationAcknowledgementRequired: true,
      rollbackPlanRequired: true,
      verificationPlanRequired: true,
      realPatchRequiredForFutureApply: true,
      pseudoDiffCanOnlySimulateIntent: true,
      actualMutationBlocked: true,
      realApplyDiffCallBlocked: true,
      writeFileBlocked: true,
      runCommandBlocked: true,
      brokerExecutionBlocked: true,
      lowConfidenceBlocksFutureApply,
      highOrCriticalRiskRequiresExtraReview,
      blockedReasons,
      warnings,
      summary: [],
    }),
  };
}

export function isApplyDiffDryRunAllowed(policy: ApplyDiffDryRunPolicy): boolean {
  return (
    policy.allowed &&
    policy.validApplyGateInputRequired &&
    policy.explicitApprovalPacketRequired &&
    policy.currentFileVerificationAcknowledgementRequired &&
    policy.rollbackPlanRequired &&
    policy.verificationPlanRequired &&
    policy.realPatchRequiredForFutureApply &&
    policy.pseudoDiffCanOnlySimulateIntent &&
    policy.actualMutationBlocked &&
    policy.realApplyDiffCallBlocked &&
    policy.writeFileBlocked &&
    policy.runCommandBlocked &&
    policy.brokerExecutionBlocked
  );
}

export function summarizeApplyDiffDryRunPolicy(policy: ApplyDiffDryRunPolicy): string[] {
  return [
    policy.allowed ? "Apply-diff dry run is allowed for simulation." : "Apply-diff dry run is blocked.",
    "Policy blocks real apply-diff, write-file, run-command, broker-execution, and actual mutation.",
    "Policy requires explicit approval packet, current file verification acknowledgement, rollback plan, and verification plan.",
    "Real patch required for future apply; pseudo diff alone is not applyable.",
    `${policy.blockedReasons.length} blocked reason(s), ${policy.warnings.length} warning(s).`,
  ];
}
