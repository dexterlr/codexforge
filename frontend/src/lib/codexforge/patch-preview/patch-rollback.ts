import type { CodexForgePatchRollbackPlan } from "./patch-preview-types";

export function buildPatchRollbackPlan(filePath: string): CodexForgePatchRollbackPlan {
  const notes = [
    "Review git diff before any future guarded apply.",
    "Keep the patch small and scoped to the expected touched files.",
    "Commit before the next phase once preview, apply approval, and validation are complete.",
    "If the change is uncommitted, revert with git restore for the touched file paths.",
    "If the change is committed, revert with git revert so history stays auditable.",
    "Preserve smoke output with the approval record and review notes.",
  ];

  return {
    filePath,
    notes,
    summary: summarizePatchRollbackPlan({ filePath, notes, summary: "" }),
  };
}

export function summarizePatchRollbackPlan(plan: CodexForgePatchRollbackPlan): string {
  return `Rollback guidance for ${plan.filePath}: inspect diff first, keep scope small, and choose git restore or git revert based on commit state.`;
}
