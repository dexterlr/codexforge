import {
  buildRealPatchPreviewStableId,
  type RealPatchPreviewRollbackOption,
  type RealPatchPreviewRollbackPlan,
} from "./real-patch-preview-types";

function normalizePath(path: string): string {
  return path.trim().replace(/\\/g, "/");
}

export function buildRealPatchPreviewRollbackOption(input: {
  id: string;
  label: string;
  command?: string | null;
  detail: string;
  previewOnly?: boolean;
}): RealPatchPreviewRollbackOption {
  return {
    id: buildRealPatchPreviewStableId("real-patch-rollback-option", input.id, input.label),
    label: input.label,
    command: input.command ?? null,
    detail: input.detail,
    previewOnly: input.previewOnly ?? true,
  };
}

export function buildRealPatchPreviewRollbackPlan(filePath: string): RealPatchPreviewRollbackPlan {
  const target = normalizePath(filePath || "selected-file");
  const options = [
    buildRealPatchPreviewRollbackOption({
      id: "preview-only",
      label: "Preview-only rollback",
      detail: "No rollback is needed because Real Patch Preview v1 does not apply patches or write files.",
    }),
    buildRealPatchPreviewRollbackOption({
      id: "before-apply",
      label: "Before any future apply",
      detail: "Inspect the diff, confirm the target file, and commit a clean checkpoint before approving mutation elsewhere.",
    }),
    buildRealPatchPreviewRollbackOption({
      id: "before-commit",
      label: "If applied later before commit",
      command: `git restore -- ${target}`,
      detail: "Use git restore for the target file if a later approved apply must be undone before commit.",
      previewOnly: false,
    }),
    buildRealPatchPreviewRollbackOption({
      id: "after-commit",
      label: "If committed later",
      command: "git revert <commit>",
      detail: "Use git revert after a later approved patch has been committed.",
      previewOnly: false,
    }),
  ];
  const notes = [
    "No rollback needed because this preview is not applied.",
    "Before apply, inspect the diff and keep the target list narrow.",
    "Before apply, commit a clean checkpoint.",
    `If applied later before commit, use git restore -- ${target}.`,
    "If committed later, use git revert <commit>.",
    "Keep smoke output with the handoff.",
    "Stop and stabilize if build or smoke validation fails.",
  ];

  return {
    id: buildRealPatchPreviewStableId("real-patch-rollback", target),
    filePath: target,
    options,
    notes,
    summary: summarizeRealPatchPreviewRollbackPlan({
      id: "pending",
      filePath: target,
      options,
      notes,
      summary: "",
    }),
  };
}

export function summarizeRealPatchPreviewRollbackPlan(plan: RealPatchPreviewRollbackPlan): string {
  return `Rollback plan for ${plan.filePath}: preview-only now; git restore before commit and git revert after commit if a future approved apply occurs.`;
}
