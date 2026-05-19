import {
  buildApprovedPatchApplyStableId,
  uniqueApprovedPatchApplyStrings,
  type ApprovedPatchApplyRequest,
  type ApprovedPatchApplyRollbackOption,
  type ApprovedPatchApplyRollbackPlan,
} from "./approved-patch-apply-types";

export function buildApprovedPatchApplyRollbackOption(args: {
  requestId: string;
  label: string;
  command: string | null;
  detail: string;
  when: ApprovedPatchApplyRollbackOption["when"];
}): ApprovedPatchApplyRollbackOption {
  return {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-rollback-option", args.requestId, args.label),
    label: args.label,
    command: args.command,
    detail: args.detail,
    when: args.when,
    copyOnly: true,
  };
}

export function buildApprovedPatchApplyRollbackPlan(
  request: ApprovedPatchApplyRequest
): ApprovedPatchApplyRollbackPlan {
  const targetFiles = uniqueApprovedPatchApplyStrings([request.selectedFilePath, ...request.expectedTouchedFiles]);
  const targetList = targetFiles.join(" ");
  const options: ApprovedPatchApplyRollbackOption[] = [
    buildApprovedPatchApplyRollbackOption({
      requestId: request.requestId,
      label: "Require clean working tree before apply",
      command: "git status --short",
      detail: "Before apply, require clean working tree or consciously isolate unrelated changes.",
      when: "before-apply",
    }),
    buildApprovedPatchApplyRollbackOption({
      requestId: request.requestId,
      label: "Review git diff before apply",
      command: "git diff --stat",
      detail: "Before apply, review git diff and touched files so rollback scope is known.",
      when: "before-apply",
    }),
    buildApprovedPatchApplyRollbackOption({
      requestId: request.requestId,
      label: "Restore target files before commit",
      command: targetList ? `git restore -- ${targetList}` : "git restore -- <target-files>",
      detail: "After apply and before commit, git restore target files to roll back the local patch.",
      when: "after-apply-before-commit",
    }),
    buildApprovedPatchApplyRollbackOption({
      requestId: request.requestId,
      label: "Revert committed patch",
      command: "git revert <commit>",
      detail: "After commit, use git revert commit to produce an auditable rollback.",
      when: "after-commit",
    }),
    buildApprovedPatchApplyRollbackOption({
      requestId: request.requestId,
      label: "Stop and stabilize on failed build or smoke",
      command: null,
      detail: "Keep validation output, stop further changes, and stabilize on failed build/smoke.",
      when: "failure",
    }),
  ];
  const guidance = [
    "Before apply, require clean working tree.",
    "Before apply, review git diff.",
    "After apply before commit, git restore target files.",
    "After commit, git revert commit.",
    "Keep validation output.",
    "Stop and stabilize on failed build/smoke.",
    "Do not restore Brain graph from this workflow.",
    "Do not mutate memory from this workflow.",
  ];

  return {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-rollback-plan", request.requestId),
    requestId: request.requestId,
    targetFiles,
    options,
    guidance,
    ready: targetFiles.length > 0 && options.length > 0,
    summary: summarizeApprovedPatchApplyRollbackPlan({ id: "", requestId: request.requestId, targetFiles, options, guidance, ready: true, summary: [] }),
  };
}

export function summarizeApprovedPatchApplyRollbackPlan(
  plan: ApprovedPatchApplyRollbackPlan
): string[] {
  return [
    `Rollback plan covers ${plan.targetFiles.length} target file(s).`,
    "Before apply: require clean working tree and review git diff.",
    "After apply before commit: git restore target files. After commit: git revert commit.",
    "Keep validation output; stop and stabilize on failed build/smoke; do not restore Brain graph or mutate memory.",
  ];
}
