import type { ApplyApprovalPacket, ApplyGateInput, PatchApplyPolicy } from "./patch-application-gate-types";

export function buildPatchApplyPolicy(input: ApplyGateInput, approvalPacket: ApplyApprovalPacket): PatchApplyPolicy {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  const highRisk = input.riskLevel === "high" || input.riskLevel === "critical";

  if (!input.previewDiffCompositionId.trim()) blockedReasons.push("Preview diff package required.");
  if (!approvalPacket.approved) blockedReasons.push("Explicit human approval required.");
  if (input.currentFileVerificationState !== "verified-current" || !approvalPacket.currentFileVerificationAcknowledged) {
    blockedReasons.push("Current files must be verified.");
  }
  if (input.rollbackNotes.length < 1 || !approvalPacket.rollbackAcknowledged) blockedReasons.push("Rollback plan required.");
  if (input.verificationChecks.length < 1) blockedReasons.push("Verification plan required.");
  if (highRisk && !approvalPacket.highRiskAcknowledged) blockedReasons.push("High/critical risk requires extra acknowledgement.");
  if (input.realPatchState !== "reviewed") warnings.push("Real patch must be reviewed separately.");
  if (input.realPatchState === "absent") blockedReasons.push("Pseudo diff alone is not applyable.");
  if (!approvalPacket.toolPolicyConfirmed) blockedReasons.push("apply-diff requires tool-policy approval.");

  return {
    id: "patch-apply-policy",
    allowed: false,
    previewDiffPackageRequired: true,
    explicitHumanApprovalRequired: true,
    currentFilesMustBeVerified: true,
    rollbackPlanRequired: true,
    verificationPlanRequired: true,
    highOrCriticalRiskRequiresExtraAcknowledgement: highRisk,
    pseudoDiffAloneIsNotApplyable: true,
    realPatchMustBeReviewedSeparately: true,
    applyDiffRequiresToolPolicyApproval: true,
    writeFileRequiresToolPolicyApproval: true,
    runCommandRequiresToolPolicyApproval: true,
    applyRequestCanBePrepared: blockedReasons.length === 0,
    actualMutationRemainsBlocked: true,
    blockedReasons: [
      ...blockedReasons,
      "Actual mutation remains blocked in this phase.",
    ],
    warnings,
    summary: summarizePatchApplyPolicy(blockedReasons.length === 0, highRisk, warnings),
  };
}

export function isPatchApplyRequestAllowed(policy: PatchApplyPolicy): boolean {
  return (
    policy.applyRequestCanBePrepared &&
    policy.previewDiffPackageRequired &&
    policy.explicitHumanApprovalRequired &&
    policy.currentFilesMustBeVerified &&
    policy.rollbackPlanRequired &&
    policy.verificationPlanRequired &&
    policy.pseudoDiffAloneIsNotApplyable &&
    policy.realPatchMustBeReviewedSeparately &&
    policy.applyDiffRequiresToolPolicyApproval &&
    policy.writeFileRequiresToolPolicyApproval &&
    policy.runCommandRequiresToolPolicyApproval &&
    policy.actualMutationRemainsBlocked
  );
}

export function summarizePatchApplyPolicy(preparableOrPolicy: PatchApplyPolicy | boolean, highRisk?: boolean, warnings?: readonly string[]): string[] {
  if (typeof preparableOrPolicy !== "boolean") {
    return [
      preparableOrPolicy.applyRequestCanBePrepared ? "Apply request preview can be prepared." : "Apply request preview is blocked.",
      "Pseudo diff alone is not applyable; real patch must be reviewed separately.",
      "apply-diff requires tool-policy approval; write-file requires tool-policy approval; run-command requires tool-policy approval.",
      "Actual mutation remains blocked in this phase.",
    ];
  }

  return [
    preparableOrPolicy ? "Apply request preview can be prepared." : "Apply request preview is blocked.",
    highRisk ? "High/critical risk acknowledgement is required." : "Risk acknowledgement is visible.",
    `${warnings?.length ?? 0} warning(s) recorded.`,
    "Actual mutation remains blocked in this phase.",
  ];
}
