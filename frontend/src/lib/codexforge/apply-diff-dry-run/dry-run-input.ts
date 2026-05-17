import {
  buildApplyDiffDryRunStableKey,
  clampApplyDiffDryRunScore,
  uniqueApplyDiffDryRunStrings,
  type ApplyDiffDryRunInput,
  type ApplyDiffDryRunInputSource,
  type ApplyDiffDryRunPatchSourceState,
  type ApplyDiffDryRunRealPatchAvailabilityState,
  type ApplyDiffDryRunValidation,
} from "./apply-dry-run-types";

function inferPatchSourceState(
  state: ApplyDiffDryRunPatchSourceState | undefined,
  availability: ApplyDiffDryRunRealPatchAvailabilityState | undefined
): ApplyDiffDryRunPatchSourceState {
  if (state) return state;
  if (availability === "reviewed") return "real-patch-reviewed";
  if (availability === "available-unreviewed") return "real-patch-available-unreviewed";
  return "pseudo-diff-only";
}

function inferRealPatchAvailability(
  state: ApplyDiffDryRunRealPatchAvailabilityState | undefined,
  patchSourceState: ApplyDiffDryRunPatchSourceState
): ApplyDiffDryRunRealPatchAvailabilityState {
  if (state) return state;
  if (patchSourceState === "real-patch-reviewed") return "reviewed";
  if (patchSourceState === "real-patch-available-unreviewed") return "available-unreviewed";
  return "missing";
}

export function buildApplyDiffDryRunInput(source: ApplyDiffDryRunInputSource): ApplyDiffDryRunInput {
  const applyGateId = String(source.applyGateId || "missing-apply-gate").trim();
  const approvalPacketId = String(source.approvalPacketId || "missing-approval-packet").trim();
  const queueItemId = String(source.queueItemId || "missing-queue-item").trim();
  const previewDiffCompositionId = String(source.previewDiffCompositionId || "missing-preview-diff-composition").trim();
  const primaryFile = String(source.primaryFile || source.targetFiles[0] || "verify-current-file-target").trim();
  const targetFiles = uniqueApplyDiffDryRunStrings([primaryFile, ...source.targetFiles]);
  const patchSourceState = inferPatchSourceState(source.patchSourceState, source.realPatchAvailabilityState);
  const realPatchAvailabilityState = inferRealPatchAvailability(source.realPatchAvailabilityState, patchSourceState);
  const rollbackPlan = uniqueApplyDiffDryRunStrings(source.rollbackPlan ?? []);
  const verificationPlan = uniqueApplyDiffDryRunStrings(source.verificationPlan ?? []);

  return {
    id: `apply-diff-dry-run:${buildApplyDiffDryRunStableKey(applyGateId, approvalPacketId, queueItemId)}`,
    applyGateId,
    approvalPacketId,
    previewDiffCompositionId,
    queueItemId,
    goal: String(source.goal || `Simulate apply-diff dry run for ${primaryFile}.`).trim(),
    targetFiles,
    primaryFile,
    patchSourceState,
    pseudoDiffSummary: uniqueApplyDiffDryRunStrings(source.pseudoDiffSummary),
    realPatchAvailabilityState,
    approvalPosture: source.approvalPosture ?? (source.approvalPacketExplicit ? "packet-present" : "missing"),
    policyPosture: source.policyPosture ?? "approval-required",
    rollbackPosture: source.rollbackPosture ?? (rollbackPlan.length > 0 ? "present" : "missing"),
    verificationPosture: source.verificationPosture ?? (verificationPlan.length > 0 ? "present" : "missing"),
    currentFileVerificationState: source.currentFileVerificationState ?? "unchecked",
    riskLevel: source.riskLevel,
    confidence: clampApplyDiffDryRunScore(source.confidence),
    approvedTargetFiles: uniqueApplyDiffDryRunStrings(source.approvedTargetFiles ?? source.targetFiles),
    rollbackPlan,
    verificationPlan,
    smokeChecks: uniqueApplyDiffDryRunStrings(source.smokeChecks ?? []),
    staleEvidenceWarnings: uniqueApplyDiffDryRunStrings(source.staleEvidenceWarnings ?? []),
    approvalPacketExplicit: source.approvalPacketExplicit === true,
    currentFileVerificationAcknowledged: source.currentFileVerificationAcknowledged === true,
    rollbackPlanAcknowledged: source.rollbackPlanAcknowledged === true,
    verificationPlanAcknowledged: source.verificationPlanAcknowledged === true,
    highRiskExtraReviewAcknowledged: source.highRiskExtraReviewAcknowledged === true,
    noMutationAcknowledged: source.noMutationAcknowledged === true,
    pseudoDiffApplyable: false,
    noMutationGuarantee:
      "Apply-Diff Dry Run is simulation only: no mutation, no file writes, no commands, no real apply-diff call, no broker-execution, no Brain graph mutation, and no network calls.",
  };
}

export function validateApplyDiffDryRunInput(input: ApplyDiffDryRunInput): ApplyDiffDryRunValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!input.applyGateId.trim()) blockedReasons.push("Valid apply gate id is required.");
  if (!input.approvalPacketId.trim()) blockedReasons.push("Explicit approval packet id is required.");
  if (!input.previewDiffCompositionId.trim()) blockedReasons.push("Preview diff composition id is required.");
  if (!input.queueItemId.trim()) blockedReasons.push("Queue item id is required.");
  if (input.targetFiles.length < 1) blockedReasons.push("At least one target file is required.");
  if (input.approvalPosture === "rejected") blockedReasons.push("Approval packet rejected this dry run.");
  if (input.pseudoDiffSummary.length < 1) warnings.push("Pseudo diff summary should be visible before dry run simulation.");
  if (!input.approvalPacketExplicit || input.approvalPosture === "missing") blockedReasons.push("Explicit approval packet required.");
  if (input.currentFileVerificationState !== "verified-current" || !input.currentFileVerificationAcknowledged) {
    blockedReasons.push("Current file verification required.");
  }
  if (input.rollbackPlan.length < 1 || input.rollbackPosture === "missing" || !input.rollbackPlanAcknowledged) {
    blockedReasons.push("Rollback plan required.");
  }
  if (input.verificationPlan.length < 1 || input.verificationPosture === "missing" || !input.verificationPlanAcknowledged) {
    blockedReasons.push("Verification plan required.");
  }
  if (!input.noMutationAcknowledged) blockedReasons.push("No-mutation guarantee acknowledgement required.");
  if (input.patchSourceState === "pseudo-diff-only" || input.realPatchAvailabilityState === "missing") {
    warnings.push("Pseudo diff alone is not applyable; simulation can only model intent.");
  }

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    summary: [
      blockedReasons.length === 0 ? "Dry run input is valid for simulation." : "Dry run input is blocked.",
      `Dry run ${input.id} targets ${input.targetFiles.length} file(s).`,
      "Validation uses supplied data only; no file reads, no commands, and no hidden mutation.",
    ],
  };
}

export function summarizeApplyDiffDryRunInput(input: ApplyDiffDryRunInput): string[] {
  return [
    `Dry run ${input.id} derives from apply gate ${input.applyGateId}, approval packet ${input.approvalPacketId}, and queue item ${input.queueItemId}.`,
    `Patch source state ${input.patchSourceState}; real patch availability ${input.realPatchAvailabilityState}.`,
    `Approval posture ${input.approvalPosture}; policy posture ${input.policyPosture}.`,
    input.pseudoDiffApplyable
      ? "Unexpected applyable pseudo diff state."
      : "Pseudo diff alone is not applyable and can only simulate intent.",
    input.noMutationGuarantee,
  ];
}
