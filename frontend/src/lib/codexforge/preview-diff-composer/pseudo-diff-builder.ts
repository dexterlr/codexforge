import {
  buildPreviewDiffComposerStableKey,
  type DiffCompositionInput,
  type DiffIntentChange,
  type DiffIntentModel,
  type PreviewDiffChangeKind,
  type PseudoDiffFile,
  type PseudoDiffHunk,
  type PseudoDiffPreview,
} from "./preview-diff-composer-types";

export function buildPseudoDiffHunk(
  change: DiffIntentChange,
  suppliedExactEdits: readonly string[] = []
): PseudoDiffHunk {
  const hasExactEdits = suppliedExactEdits.length > 0;
  return {
    id: `preview-diff-hunk-${buildPreviewDiffComposerStableKey(change.id, change.targetFile)}`,
    title: `${change.category} intent for ${change.targetFile}`,
    beforeHint: "Before: inspect the current file and locate the affected symbol, component, route, or test.",
    afterHint: hasExactEdits
      ? "After: review supplied exact edits against current file content before using Safe Patch Preview."
      : "After: ???intent hunk??? implement only the reviewed behavior after inspection.",
    intentLines: [
      "???intent hunk???",
      `Target: ${change.targetFile}`,
      `Change: ${change.whatShouldChange}`,
      `Reason: ${change.whyItShouldChange}`,
      "No exact source lines are invented by this pseudo diff.",
    ],
    suppliedExactEdits: [...suppliedExactEdits],
    previewOnly: true,
  };
}

export function buildPseudoDiffFile(change: DiffIntentChange): PseudoDiffFile {
  const hunk = buildPseudoDiffHunk(change);
  return {
    id: `preview-diff-file-${buildPreviewDiffComposerStableKey(change.id, change.targetFile)}`,
    filePath: change.targetFile,
    changeKind: change.category as PreviewDiffChangeKind,
    intentSummary: `${change.category}: ${change.whatShouldChange}`,
    pseudoHunks: [hunk],
    beforeHint: "Current file content is authority; inspect it before composing a real diff.",
    afterHint: "Preview-only pseudo diff describes intended shape, not applyable code.",
    riskWarning: `Expected risk is ${change.expectedRisk}; evidence is context, not proof.`,
    verificationNote: change.verificationChecks.join("; "),
    previewOnly: true,
    notApplyablePatch: true,
  };
}

export function buildPseudoDiffPreview(input: DiffCompositionInput, intent: DiffIntentModel): PseudoDiffPreview {
  const files = intent.changes.map(buildPseudoDiffFile);
  return {
    id: `preview-diff-preview-${buildPreviewDiffComposerStableKey(input.id)}`,
    compositionInputId: input.id,
    previewOnly: true,
    notApplyablePatch: true,
    generatedFromRecommendationMetadata: true,
    requiresCurrentFileInspection: true,
    files,
    summary: summarizePseudoDiffPreview({
      id: "pending",
      compositionInputId: input.id,
      previewOnly: true,
      notApplyablePatch: true,
      generatedFromRecommendationMetadata: true,
      requiresCurrentFileInspection: true,
      files,
      summary: [],
    }),
  };
}

export function summarizePseudoDiffPreview(preview: PseudoDiffPreview): string[] {
  const hunkCount = preview.files.reduce((count, file) => count + file.pseudoHunks.length, 0);
  return [
    `Preview-only pseudo diff covers ${preview.files.length} file(s) and ${hunkCount} pseudo hunk(s).`,
    "This is not an applyable patch and is generated from recommendation metadata.",
    "Requires current file inspection before any real diff.",
  ];
}
