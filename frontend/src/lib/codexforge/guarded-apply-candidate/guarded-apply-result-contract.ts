import { buildGuardedApplyApprovalRequirement } from "./guarded-apply-approval-contract";
import { buildGuardedApplyCandidateStableId, type GuardedApplyRequirement, type GuardedApplyResultContract } from "./guarded-apply-candidate-types";

export function buildGuardedApplyResultRequirement(
  id: string,
  label: string,
  satisfied = true,
  detail = "Result requirement is documented."
): GuardedApplyRequirement {
  return buildGuardedApplyApprovalRequirement(id, label, satisfied, detail);
}

export function buildGuardedApplyResultContract(): GuardedApplyResultContract {
  const requirements = [
    buildGuardedApplyResultRequirement("apply-result-captured", "Apply result captured", true, "Capture success/failure and evidence id."),
    buildGuardedApplyResultRequirement("touched-file-list-captured", "Touched file list captured", true, "Exactly one touched file is recorded."),
    buildGuardedApplyResultRequirement("validation-result-captured", "Validation result captured", true, "Validation output/status is captured after separate validation."),
    buildGuardedApplyResultRequirement("failure-route-visible", "Failure route visible", true, "Failure route points to Closed Loop."),
    buildGuardedApplyResultRequirement("workflow-result-record-ready", "Workflow result record ready", true, "Ready for workflow result handoff."),
    buildGuardedApplyResultRequirement("run-history-handoff-ready", "Run history handoff ready", true, "Ready for run history timeline review."),
    buildGuardedApplyResultRequirement("commit-guidance-after-validation", "Commit guidance only after validation passed", true, "No commit guidance before validation passes."),
    buildGuardedApplyResultRequirement("no-automatic-commit", "No automatic commit", true, "No automatic commit."),
    buildGuardedApplyResultRequirement("no-memory-auto-promotion", "No memory auto-promotion", true, "No memory auto-promotion."),
  ];
  const contract: GuardedApplyResultContract = {
    id: buildGuardedApplyCandidateStableId("result-contract", requirements.map((item) => item.id).join("|")),
    requirements,
    workflowResultRecordReady: true,
    runHistoryHandoffReady: true,
    noAutomaticCommit: true,
    noMemoryAutoPromotion: true,
    summary: [],
  };
  return { ...contract, summary: summarizeGuardedApplyResultContract(contract) };
}

export function summarizeGuardedApplyResultContract(contract: GuardedApplyResultContract): string[] {
  return [
    `Result contract has ${contract.requirements.length} capture requirement(s).`,
    "Result contract says no automatic commit.",
    "Result contract says no memory auto-promotion.",
  ];
}
