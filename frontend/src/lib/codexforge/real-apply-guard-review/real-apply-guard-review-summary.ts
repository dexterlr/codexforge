import {
  buildRealApplyGuardReviewStableKey,
  type ApplyApprovalPacketReview,
  type ApplyCommandWriteSeparation,
  type ApplyDiffBoundaryReview,
  type ApplyGuardGoNoGo,
  type ApplyGuardPolicyReview,
  type ApplyPathBoundaryReview,
  type ApplyRollbackConfidence,
  type ApplyValidationRequirement,
  type RealApplyGuardReviewSummary,
} from "./real-apply-guard-review-types";

export function buildRealApplyGuardReviewSummary(args: {
  reviewId: string;
  policyReview: ApplyGuardPolicyReview;
  approvalReview: ApplyApprovalPacketReview;
  diffBoundaryReview: ApplyDiffBoundaryReview;
  pathBoundaryReview: ApplyPathBoundaryReview;
  rollbackConfidence: ApplyRollbackConfidence;
  commandWriteSeparation: ApplyCommandWriteSeparation;
  validationRequirement: ApplyValidationRequirement;
  goNoGo: ApplyGuardGoNoGo;
}): RealApplyGuardReviewSummary {
  const blockerCount =
    args.policyReview.blockerCount +
    args.approvalReview.blockerCount +
    args.diffBoundaryReview.blockerCount +
    args.pathBoundaryReview.blockerCount +
    args.rollbackConfidence.blockerCount +
    args.commandWriteSeparation.blockerCount +
    args.validationRequirement.blockerCount;
  const summary: RealApplyGuardReviewSummary = {
    id: buildRealApplyGuardReviewStableKey("real-apply-guard-review-summary", args.reviewId, args.goNoGo.decision),
    policyStatus: args.policyReview.overallStatus,
    approvalStatus: args.approvalReview.overallStatus,
    diffBoundaryStatus: args.diffBoundaryReview.overallStatus,
    pathBoundaryStatus: args.pathBoundaryReview.overallStatus,
    rollbackConfidence: args.rollbackConfidence.confidence,
    commandWriteSeparationStatus: args.commandWriteSeparation.overallStatus,
    validationRequirementStatus: args.validationRequirement.overallStatus,
    blockerCount,
    goNoGoDecision: args.goNoGo.decision,
    nextSafeAction: args.goNoGo.nextSafeAction,
    executionAllowed: false,
    summary: [],
  };
  return { ...summary, summary: summarizeRealApplyGuardReviewSession(summary) };
}

export function summarizeRealApplyGuardReviewSession(summary: RealApplyGuardReviewSummary): string[] {
  return [
    `Policy=${summary.policyStatus}; approval=${summary.approvalStatus}; diff=${summary.diffBoundaryStatus}; path=${summary.pathBoundaryStatus}.`,
    `Rollback=${summary.rollbackConfidence}; command/write=${summary.commandWriteSeparationStatus}; validation=${summary.validationRequirementStatus}.`,
    `Blockers=${summary.blockerCount}; decision=${summary.goNoGoDecision}; executionAllowed false.`,
    `Next safe action: ${summary.nextSafeAction}`,
  ];
}
