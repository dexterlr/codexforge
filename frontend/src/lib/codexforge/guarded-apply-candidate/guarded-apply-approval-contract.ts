import { buildGuardedApplyCandidateStableId, type GuardedApplyApprovalContract, type GuardedApplyRequirement } from "./guarded-apply-candidate-types";

export function buildGuardedApplyApprovalRequirement(
  id: string,
  label: string,
  satisfied = false,
  detail = "Operator review required."
): GuardedApplyRequirement {
  return { id, label, required: true, satisfied, detail };
}

export function buildGuardedApplyApprovalContract(satisfiedIds: readonly string[] = []): GuardedApplyApprovalContract {
  const isSatisfied = (id: string) => satisfiedIds.includes(id);
  const requirements = [
    buildGuardedApplyApprovalRequirement("operator-reviewed-diff", "Operator reviewed diff", isSatisfied("operator-reviewed-diff"), "One preview diff reviewed."),
    buildGuardedApplyApprovalRequirement("operator-reviewed-selected-file", "Operator reviewed selected file", isSatisfied("operator-reviewed-selected-file"), "Exactly one selected file reviewed."),
    buildGuardedApplyApprovalRequirement("operator-acknowledges-exact-patch", "Operator acknowledges exact patch", isSatisfied("operator-acknowledges-exact-patch"), "Approval tied to exact diff hash/label."),
    buildGuardedApplyApprovalRequirement("operator-acknowledges-rollback-plan", "Operator acknowledges rollback plan", isSatisfied("operator-acknowledges-rollback-plan"), "Rollback plan reviewed before apply."),
    buildGuardedApplyApprovalRequirement("operator-acknowledges-validation-plan", "Operator acknowledges validation plan", isSatisfied("operator-acknowledges-validation-plan"), "Validation plan reviewed as separate step."),
    buildGuardedApplyApprovalRequirement("operator-acknowledges-no-auto-run", "Operator acknowledges no auto-run", isSatisfied("operator-acknowledges-no-auto-run"), "Validation is not run automatically."),
    buildGuardedApplyApprovalRequirement("operator-acknowledges-no-automatic-commit", "Operator acknowledges no automatic commit", isSatisfied("operator-acknowledges-no-automatic-commit"), "Commit guidance only after validation passed."),
    buildGuardedApplyApprovalRequirement("operator-acknowledges-latest-message-authority", "Operator acknowledges latest-message authority", isSatisfied("operator-acknowledges-latest-message-authority"), "Approval invalidated if newest request changes."),
    buildGuardedApplyApprovalRequirement("operator-acknowledges-low-risk-first-candidate", "Operator acknowledges first candidate is low-risk only", isSatisfied("operator-acknowledges-low-risk-first-candidate"), "First candidate is one-file text patch only."),
  ];
  const contract: GuardedApplyApprovalContract = {
    id: buildGuardedApplyCandidateStableId("approval-contract", requirements.map((item) => `${item.id}:${item.satisfied}`).join("|")),
    requirements,
    ready: requirements.every((item) => item.satisfied),
    invalidatedByDiffFileOrRequestChange: true,
    summary: [],
  };
  return { ...contract, summary: summarizeGuardedApplyApprovalContract(contract) };
}

export function summarizeGuardedApplyApprovalContract(contract: GuardedApplyApprovalContract): string[] {
  return [
    `Approval contract ready=${contract.ready}.`,
    "Approval contract invalidates if diff/file/request changes.",
    `${contract.requirements.filter((item) => !item.satisfied).length} approval acknowledgement(s) still required.`,
  ];
}
