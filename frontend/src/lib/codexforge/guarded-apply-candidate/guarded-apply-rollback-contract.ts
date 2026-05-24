import { buildGuardedApplyApprovalRequirement } from "./guarded-apply-approval-contract";
import { buildGuardedApplyCandidateStableId, type GuardedApplyRequirement, type GuardedApplyRollbackContract } from "./guarded-apply-candidate-types";

export function buildGuardedApplyRollbackRequirement(
  id: string,
  label: string,
  satisfied = true,
  detail = "Rollback requirement is documented."
): GuardedApplyRequirement {
  return buildGuardedApplyApprovalRequirement(id, label, satisfied, detail);
}

export function buildGuardedApplyRollbackContract(targetFile = "src/app/code-flow/page-client.tsx"): GuardedApplyRollbackContract {
  const requirements = [
    buildGuardedApplyRollbackRequirement("pre-apply-git-status-reviewed", "Pre-apply git status reviewed", true, "Run/copy guidance: git status --short before apply."),
    buildGuardedApplyRollbackRequirement("pre-apply-diff-available", "Pre-apply diff available", true, "Keep preview diff and current file evidence available."),
    buildGuardedApplyRollbackRequirement("target-file-restore-guidance", "Target file restore guidance", true, `Use git restore -- ${targetFile} before commit if rollback is needed.`),
    buildGuardedApplyRollbackRequirement("staged-restore-guidance", "Staged restore guidance", true, `Use git restore --staged -- ${targetFile} if the target file was staged.`),
    buildGuardedApplyRollbackRequirement("commit-revert-guidance", "Commit revert guidance", true, "Use git revert <commit-sha> after commit."),
    buildGuardedApplyRollbackRequirement("partial-apply-failure-guidance", "Partial apply failure guidance", true, "Capture evidence, stop, and restore the target file."),
    buildGuardedApplyRollbackRequirement("validation-failure-guidance", "Validation failure guidance", true, "Route validation failure to Closed Loop before stacking changes."),
    buildGuardedApplyRollbackRequirement("evidence-capture-before-rollback", "Evidence capture before rollback", true, "Capture apply result and validation output before rollback."),
    buildGuardedApplyRollbackRequirement("rollback-limitations-acknowledged", "Rollback limitations acknowledged", true, "Rollback cannot replace review of side effects or generated files."),
  ];
  const contract: GuardedApplyRollbackContract = {
    id: buildGuardedApplyCandidateStableId("rollback-contract", targetFile),
    targetFile,
    requirements,
    ready: requirements.every((item) => item.satisfied),
    guidance: [
      "Before apply: git status --short",
      "Before apply: git diff --stat",
      `Before commit rollback: git restore -- ${targetFile}`,
      `If staged: git restore --staged -- ${targetFile}`,
      "After commit rollback: git revert <commit-sha>",
      "Capture evidence before rollback.",
    ],
    limitationsAcknowledged: true,
    summary: [],
  };
  return { ...contract, summary: summarizeGuardedApplyRollbackContract(contract) };
}

export function summarizeGuardedApplyRollbackContract(contract: GuardedApplyRollbackContract): string[] {
  return [
    `Rollback contract ready=${contract.ready} for ${contract.targetFile}.`,
    "Rollback contract mentions git restore and git revert.",
    "Evidence capture before rollback and rollback limitations are acknowledged.",
  ];
}
