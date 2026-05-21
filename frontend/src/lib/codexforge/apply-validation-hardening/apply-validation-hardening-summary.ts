import { buildApplyValidationStableId, type ApplyValidationHardeningSummary, type ApplyValidationNextActionPlan, type CodingFlowCompletion, type HardenedApplyPolicy, type HardenedDiffSafety, type HardenedRollbackPlan, type HardenedValidationPlan, type ValidationOutputReview, type ValidationResultRouting } from "./apply-validation-hardening-types";

export function buildApplyValidationHardeningSummary(args: {
  policy?: HardenedApplyPolicy | null;
  diffSafety?: HardenedDiffSafety | null;
  rollbackPlan?: HardenedRollbackPlan | null;
  validationPlan?: HardenedValidationPlan | null;
  outputReview?: ValidationOutputReview | null;
  routing?: ValidationResultRouting | null;
  completion?: CodingFlowCompletion | null;
  nextActionPlan?: ApplyValidationNextActionPlan | null;
} = {}): ApplyValidationHardeningSummary {
  const blockerCount = (args.policy?.blockedReasons.length ?? 0) + (args.diffSafety?.blockerCount ?? 0);
  const summary: ApplyValidationHardeningSummary = {
    id: buildApplyValidationStableId("apply-validation-hardening-summary", args.policy?.id ?? "policy", args.completion?.status ?? "completion"),
    applyPolicyStatus: args.policy?.allowed ? "allowed" : "blocked",
    diffSafetyStatus: args.diffSafety?.overallStatus ?? "unknown",
    rollbackReady: Boolean(args.rollbackPlan?.ready),
    validationCommandCount: args.validationPlan?.commands.length ?? 0,
    outputReviewStatus: args.outputReview?.status ?? "unknown",
    resultRoute: args.routing?.selectedRoute.label ?? "Validation Runner",
    completionStatus: args.completion?.status ?? "not-started",
    blockerCount,
    nextSafeAction: args.nextActionPlan?.selected.label ?? "Review apply and validation hardening.",
    summary: [],
  };
  return { ...summary, summary: summarizeApplyValidationHardeningSession(summary) };
}

export function summarizeApplyValidationHardeningSession(summary: ApplyValidationHardeningSummary): string[] {
  return [
    `Apply policy is ${summary.applyPolicyStatus}; diff safety is ${summary.diffSafetyStatus}.`,
    `Rollback ready=${summary.rollbackReady}; ${summary.validationCommandCount} validation command(s).`,
    `Output review is ${summary.outputReviewStatus}; result route is ${summary.resultRoute}.`,
    `${summary.blockerCount} blocker(s). Next safe action: ${summary.nextSafeAction}.`,
  ];
}
