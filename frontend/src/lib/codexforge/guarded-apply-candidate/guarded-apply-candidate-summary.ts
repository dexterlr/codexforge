import { buildGuardedApplyCandidateStableId, type GuardedApplyApprovalContract, type GuardedApplyCandidateInput, type GuardedApplyCandidatePolicy, type GuardedApplyCandidateSummary, type GuardedApplyImplementationGaps, type GuardedApplyResultContract, type GuardedApplyRollbackContract, type GuardedApplyValidationContract, type SingleFileApplyScope } from "./guarded-apply-candidate-types";

export function buildGuardedApplyCandidateSummary(args: {
  input: GuardedApplyCandidateInput;
  scope: SingleFileApplyScope;
  policy: GuardedApplyCandidatePolicy;
  approval: GuardedApplyApprovalContract;
  rollback: GuardedApplyRollbackContract;
  validation: GuardedApplyValidationContract;
  result: GuardedApplyResultContract;
  gaps: GuardedApplyImplementationGaps;
}): GuardedApplyCandidateSummary {
  const summary: GuardedApplyCandidateSummary = {
    id: buildGuardedApplyCandidateStableId("candidate-summary", args.input.candidateId),
    selectedTargetMode: args.input.targetMode,
    oneFileScopeStatus: args.scope.overallStatus,
    policyStatus: args.policy.guardedApplyCandidateAllowed ? "allowed" : "blocked",
    approvalContractStatus: args.approval.ready ? "ready" : "blocked",
    executionPlanStatus: "design-only",
    rollbackContractStatus: args.rollback.ready ? "ready" : "blocked",
    validationContractStatus: args.validation.requirements.every((item) => item.satisfied) ? "ready" : "blocked",
    resultContractStatus: args.result.requirements.every((item) => item.satisfied) ? "ready" : "blocked",
    implementationGapCount: args.gaps.gaps.length,
    executionAllowed: false,
    nextSafeAction: args.gaps.blockerCount > 0 ? "Clear blocker gaps before implementation." : args.policy.nextSafeAction,
    summary: [],
  };
  return { ...summary, summary: summarizeGuardedApplyCandidateSession(summary) };
}

export function summarizeGuardedApplyCandidateSession(summary: GuardedApplyCandidateSummary): string[] {
  return [
    `Target mode: ${summary.selectedTargetMode}.`,
    `One-file scope=${summary.oneFileScopeStatus}; policy=${summary.policyStatus}; approval=${summary.approvalContractStatus}.`,
    `Rollback=${summary.rollbackContractStatus}; validation=${summary.validationContractStatus}; result=${summary.resultContractStatus}.`,
    `Implementation gaps: ${summary.implementationGapCount}; execution allowed false.`,
    `Next safe action: ${summary.nextSafeAction}`,
  ];
}
