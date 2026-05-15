import {
  buildPreviewDiffComposerStableKey,
  uniquePreviewDiffComposerStrings,
  type DiffCompositionInput,
  type DiffRollbackPlan,
} from "./preview-diff-composer-types";

export function buildDiffRollbackPlan(input: DiffCompositionInput): DiffRollbackPlan {
  const notes = uniquePreviewDiffComposerStrings([
    "Inspect git diff before apply and before commit.",
    "Keep patch minimal and avoid mixed changes.",
    "Use git restore before commit if the reviewed diff should be discarded.",
    "Use git revert after commit if rollback is needed on shared history.",
    "Preserve smoke output so reviewers can compare failure and recovery evidence.",
    "Tag clean checkpoints before risky follow-up work.",
    ...input.rollbackNotes,
  ]);

  return {
    id: `preview-diff-rollback-plan-${buildPreviewDiffComposerStableKey(input.id)}`,
    compositionInputId: input.id,
    notes,
    summary: summarizeDiffRollbackPlan({ id: "pending", compositionInputId: input.id, notes, summary: [] }),
  };
}

export function summarizeDiffRollbackPlan(plan: DiffRollbackPlan): string[] {
  return [
    `${plan.notes.length} rollback note(s) prepared.`,
    "Rollback guidance keeps changes reviewable before commit and reversible after commit.",
  ];
}
