import {
  buildPatchApplicationGateStableKey,
  clampPatchApplicationGateScore,
  uniquePatchApplicationGateStrings,
  type ApplyGateInput,
  type ApplyGateInputSource,
  type ApplyGateValidation,
} from "./patch-application-gate-types";

export function buildApplyGateInput(source: ApplyGateInputSource): ApplyGateInput {
  const primaryFile = String(source.primaryFile || source.targetFiles[0] || "verify-current-file-target").trim();
  const targetFiles = uniquePatchApplicationGateStrings([primaryFile, ...source.targetFiles]);
  const previewDiffCompositionId = String(source.previewDiffCompositionId || "missing-preview-diff-composition").trim();
  const queueItemId = String(source.queueItemId || "missing-queue-item").trim();

  return {
    id: `apply-gate:${buildPatchApplicationGateStableKey(previewDiffCompositionId, queueItemId, primaryFile)}`,
    previewDiffCompositionId,
    queueItemId,
    sourceGroundedFixId: String(source.sourceGroundedFixId || "unlinked-grounded-fix").trim(),
    goal: String(source.goal || `Prepare human-approved apply gate for ${primaryFile}.`).trim(),
    targetFiles,
    primaryFile,
    pseudoDiffSummary: uniquePatchApplicationGateStrings(source.pseudoDiffSummary),
    realPatchState: source.realPatchState ?? "absent",
    riskLevel: source.riskLevel,
    confidence: clampPatchApplicationGateScore(source.confidence),
    verificationChecks: uniquePatchApplicationGateStrings(source.verificationChecks ?? []),
    rollbackNotes: uniquePatchApplicationGateStrings(source.rollbackNotes ?? []),
    approvalPosture: source.approvalPosture ?? "review-required",
    currentFileVerificationState: source.currentFileVerificationState ?? "unchecked",
    humanReviewState: source.humanReviewState ?? "not-reviewed",
    noHiddenMutationGuarantee:
      "Apply Gate Input performs no file reads, no file writes, no commands, no apply-diff call, no Brain graph mutation, and no network calls.",
  };
}

export function validateApplyGateInput(input: ApplyGateInput): ApplyGateValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!input.previewDiffCompositionId.trim()) blockedReasons.push("Preview diff composition id is required.");
  if (!input.queueItemId.trim()) blockedReasons.push("Queue item id is required.");
  if (!input.primaryFile.trim()) blockedReasons.push("Primary file is required.");
  if (input.targetFiles.length < 1) blockedReasons.push("At least one target file is required.");
  if (input.pseudoDiffSummary.length < 1) warnings.push("Pseudo diff summary should be visible before apply review.");
  if (input.realPatchState !== "reviewed") warnings.push("Real patch must be reviewed separately before any future executor.");
  if (input.currentFileVerificationState !== "verified-current") blockedReasons.push("Current files must be verified.");
  if (input.humanReviewState === "rejected") blockedReasons.push("Human review rejected this apply gate.");
  if (input.verificationChecks.length < 1) blockedReasons.push("Verification plan required.");
  if (input.rollbackNotes.length < 1) blockedReasons.push("Rollback plan required.");

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    summary: [
      blockedReasons.length === 0 ? "Apply gate input is complete for request preview." : "Apply gate input is blocked.",
      `Targets ${input.targetFiles.length} file(s); current files must be verified.`,
      "Validation is deterministic and performs no file reads or mutation.",
    ],
  };
}

export function summarizeApplyGateInput(input: ApplyGateInput): string[] {
  return [
    `Apply gate ${input.id} was derived from preview diff composition ${input.previewDiffCompositionId}.`,
    `Queue item ${input.queueItemId}; source grounded fix ${input.sourceGroundedFixId}.`,
    `Risk ${input.riskLevel}; confidence ${input.confidence}; real patch state ${input.realPatchState}.`,
    input.noHiddenMutationGuarantee,
  ];
}
