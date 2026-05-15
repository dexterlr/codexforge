import {
  buildPreviewDiffComposerStableKey,
  clampPreviewDiffComposerScore,
  uniquePreviewDiffComposerStrings,
  type DiffCompositionInput,
  type DiffCompositionInputSource,
  type DiffCompositionValidation,
} from "./preview-diff-composer-types";

export function buildDiffCompositionInput(source: DiffCompositionInputSource): DiffCompositionInput {
  const targetFiles = uniquePreviewDiffComposerStrings([source.primaryFile, ...source.targetFiles]);
  const primaryFile = String(source.primaryFile || targetFiles[0] || "unselected-file").trim();
  const goal = String(source.goal || `Compose preview diff for ${primaryFile}.`).trim();

  return {
    id: `preview-diff-composition-${buildPreviewDiffComposerStableKey(source.queueItemId, primaryFile, goal)}`,
    queueItemId: String(source.queueItemId || "unqueued").trim(),
    sourceGroundedFixId: String(source.sourceGroundedFixId || "unlinked-grounded-fix").trim(),
    goal,
    targetFiles,
    primaryFile,
    suspectedRootCause: String(source.suspectedRootCause || "Current root cause must be verified by inspecting the file.").trim(),
    recommendedApproach: String(source.recommendedApproach || "Inspect current file content, then make the smallest reviewed edit.").trim(),
    evidenceIds: uniquePreviewDiffComposerStrings(source.evidenceIds),
    riskLevel: source.riskLevel,
    confidence: clampPreviewDiffComposerScore(source.confidence),
    suggestedTests: uniquePreviewDiffComposerStrings(source.suggestedTests ?? []),
    rollbackNotes: uniquePreviewDiffComposerStrings(source.rollbackNotes ?? []),
    approvalPosture: source.approvalPosture ?? "review-required",
    previewOnlyGuarantee:
      "Preview-only composition package: no file reads, no file writes, no commands, no graph mutation, no apply action.",
  };
}

export function validateDiffCompositionInput(input: DiffCompositionInput): DiffCompositionValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!input.queueItemId.trim()) blockedReasons.push("Queue item id is required.");
  if (!input.sourceGroundedFixId.trim()) warnings.push("Source grounded fix id should be linked before implementation.");
  if (!input.primaryFile.trim()) blockedReasons.push("Primary file is required.");
  if (input.targetFiles.length < 1) blockedReasons.push("At least one target file is required.");
  if (input.evidenceIds.length < 1) warnings.push("No evidence ids supplied; evidence is context, not proof.");
  if (input.confidence < 0.35) warnings.push("Low confidence composition should be treated as investigation first.");
  if (input.approvalPosture === "blocked") blockedReasons.push("Approval posture is blocked.");

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    summary: [
      blockedReasons.length === 0
        ? `Composition input ${input.id} is ready for preview-only review.`
        : `Composition input ${input.id} is blocked for preview review.`,
      `Targets ${input.targetFiles.length} file(s); primary authority remains current file content.`,
      "No files are read or written by validation.",
    ],
  };
}

export function summarizeDiffCompositionInput(input: DiffCompositionInput): string[] {
  return [
    `Queue item ${input.queueItemId} composes into ${input.id}.`,
    `Primary file: ${input.primaryFile}.`,
    `Risk ${input.riskLevel}; confidence ${input.confidence}.`,
    input.previewOnlyGuarantee,
  ];
}
