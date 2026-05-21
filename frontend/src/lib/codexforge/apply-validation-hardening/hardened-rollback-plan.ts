import { buildApplyValidationStableId, normalizeApplyValidationPath, uniqueApplyValidationStrings, type HardenedRollbackOption, type HardenedRollbackPlan } from "./apply-validation-hardening-types";

export function buildHardenedRollbackOption(input: HardenedRollbackOption): HardenedRollbackOption {
  return { ...input, copyOnly: true };
}

export function buildHardenedRollbackPlan(args: { targetFiles?: readonly string[] | null } = {}): HardenedRollbackPlan {
  const targetFiles = uniqueApplyValidationStrings((args.targetFiles ?? ["src/app/code-flow/page-client.tsx"]).map(normalizeApplyValidationPath));
  const primaryFile = targetFiles[0] ?? "<target-file>";
  const options = [
    buildHardenedRollbackOption({ id: "check-git-status-before-apply", label: "Before apply: check git status", command: "git status --short", detail: "Know what is already changed before requesting guarded apply.", when: "before-apply", copyOnly: true }),
    buildHardenedRollbackOption({ id: "review-diff-before-apply", label: "Before apply: review diff", command: "git diff --stat", detail: "Review diff size and touched files before applying.", when: "before-apply", copyOnly: true }),
    buildHardenedRollbackOption({ id: "restore-target-file-before-commit", label: "After apply before commit: restore target file", command: `git restore -- ${primaryFile}`, detail: "Use git restore target file before commit if the applied patch is wrong.", when: "after-apply-before-commit", copyOnly: true }),
    buildHardenedRollbackOption({ id: "revert-commit-after-commit", label: "After commit: revert commit", command: "git revert <commit-sha>", detail: "Use git revert commit after a committed bad apply.", when: "after-commit", copyOnly: true }),
    buildHardenedRollbackOption({ id: "validation-fails-route-closed-loop", label: "If validation fails: keep output and route", command: null, detail: "Keep diff/output and route to Closed Loop or regression triage; do not stack unrelated changes.", when: "validation-failure", copyOnly: true }),
    buildHardenedRollbackOption({ id: "app-breaks-stop-restore", label: "If app breaks: stop and restore", command: `git restore -- ${primaryFile}`, detail: "Stop, restore the target file, keep validation output for regression triage, and review the patch.", when: "app-breakage", copyOnly: true }),
  ];
  const plan: HardenedRollbackPlan = {
    id: buildApplyValidationStableId("hardened-rollback-plan", ...targetFiles),
    targetFiles,
    options,
    ready: targetFiles.length > 0 && options.length > 0,
    guidance: [
      "Before apply, check git status and review diff.",
      "If smoke fails, do not stack unrelated changes.",
      "Keep validation output for regression triage.",
    ],
    summary: [],
  };
  return { ...plan, summary: summarizeHardenedRollbackPlan(plan) };
}

export function summarizeHardenedRollbackPlan(plan: HardenedRollbackPlan): string[] {
  return [
    `Rollback plan ready=${plan.ready}.`,
    "Plan includes git status, git restore target file, git revert commit, and failure routing.",
    `${plan.options.length} rollback option(s) are copy-only.`,
  ];
}
