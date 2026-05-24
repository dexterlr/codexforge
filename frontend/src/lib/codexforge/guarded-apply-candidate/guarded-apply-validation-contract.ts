import { buildGuardedApplyApprovalRequirement } from "./guarded-apply-approval-contract";
import { buildGuardedApplyCandidateStableId, type GuardedApplyRequirement, type GuardedApplyValidationContract } from "./guarded-apply-candidate-types";

export function buildGuardedApplyValidationRequirement(
  id: string,
  label: string,
  satisfied = true,
  detail = "Validation requirement is documented."
): GuardedApplyRequirement {
  return buildGuardedApplyApprovalRequirement(id, label, satisfied, detail);
}

export function buildGuardedApplyValidationContract(targetedSmoke = "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-guarded-apply-candidate.ps1"): GuardedApplyValidationContract {
  const commands = [
    "npm run build",
    targetedSmoke,
    "npm run smoke:codexforge:server",
    "git diff --check",
    "git status --short",
  ];
  const requirements = [
    buildGuardedApplyValidationRequirement("validation-after-apply", "Validation must happen after apply", true, "Validation starts only after apply result capture."),
    buildGuardedApplyValidationRequirement("validation-separate-from-apply", "Validation is separate from apply", true, "No combined apply+validate button."),
    buildGuardedApplyValidationRequirement("no-auto-run", "No auto-run", true, "Commands are copy/manual or approved validation runner only."),
    buildGuardedApplyValidationRequirement("build-check", "npm run build", true, "Required build check."),
    buildGuardedApplyValidationRequirement("targeted-smoke", "targeted smoke", true, "Run the targeted smoke for the changed surface."),
    buildGuardedApplyValidationRequirement("server-smoke", "npm run smoke:codexforge:server", true, "Run server smoke after targeted checks."),
    buildGuardedApplyValidationRequirement("diff-check", "git diff --check", true, "Check whitespace and patch hygiene."),
    buildGuardedApplyValidationRequirement("status-check", "git status --short", true, "Capture touched file list and dirty state."),
    buildGuardedApplyValidationRequirement("output-captured-reviewed", "Result output captured/reviewed", true, "Captured output becomes result handoff evidence."),
    buildGuardedApplyValidationRequirement("failure-routes-closed-loop", "Failure routes to closed-loop", true, "Failure routes to closed-loop before more edits."),
  ];
  const contract: GuardedApplyValidationContract = {
    id: buildGuardedApplyCandidateStableId("validation-contract", commands.join("|")),
    requirements,
    commands,
    validationSeparateFromApply: true,
    noAutoRunGuarantee: true,
    summary: [],
  };
  return { ...contract, summary: summarizeGuardedApplyValidationContract(contract) };
}

export function summarizeGuardedApplyValidationContract(contract: GuardedApplyValidationContract): string[] {
  return [
    `Validation contract includes ${contract.commands.length} command/check item(s).`,
    "Validation contract includes npm run build, targeted smoke, npm run smoke:codexforge:server, git diff --check, and git status --short.",
    "Validation is separate from apply and no auto-run is allowed.",
  ];
}
