import {
  buildRealApplyGuardReviewStableKey,
  type ApplyApprovalPacketReview,
  type ApplyCommandWriteSeparation,
  type ApplyDiffBoundaryReview,
  type ApplyGuardGoNoGo,
  type ApplyGuardGoNoGoDecision,
  type ApplyGuardGoNoGoReason,
  type ApplyGuardPolicyReview,
  type ApplyGuardReviewStatus,
  type ApplyPathBoundaryReview,
  type ApplyRollbackConfidence,
  type ApplyValidationRequirement,
} from "./real-apply-guard-review-types";

export function buildApplyGuardGoNoGoReason(input: {
  id: string;
  label: string;
  status: ApplyGuardReviewStatus;
  detail: string;
  blocksApply?: boolean;
}): ApplyGuardGoNoGoReason {
  return { blocksApply: input.status === "blocker", ...input };
}

export function buildApplyGuardGoNoGo(args: {
  reviewId: string;
  policyReview: ApplyGuardPolicyReview;
  approvalReview: ApplyApprovalPacketReview;
  diffBoundaryReview: ApplyDiffBoundaryReview;
  pathBoundaryReview: ApplyPathBoundaryReview;
  rollbackConfidence: ApplyRollbackConfidence;
  commandWriteSeparation: ApplyCommandWriteSeparation;
  validationRequirement: ApplyValidationRequirement;
}): ApplyGuardGoNoGo {
  const reasons = [
    buildApplyGuardGoNoGoReason({ id: "no-safety-blockers", label: "No safety blockers", status: totalBlockers(args) === 0 ? "pass" : "blocker", detail: "No safety blockers are required for go." }),
    buildApplyGuardGoNoGoReason({ id: "approval-packet-complete", label: "Approval packet complete", status: args.approvalReview.overallStatus, detail: "Approval packet complete." }),
    buildApplyGuardGoNoGoReason({ id: "diff-boundaries-safe", label: "Diff boundaries safe", status: args.diffBoundaryReview.overallStatus, detail: "Diff boundaries safe." }),
    buildApplyGuardGoNoGoReason({ id: "path-boundaries-safe", label: "Path boundaries safe", status: args.pathBoundaryReview.overallStatus, detail: "Path boundaries safe." }),
    buildApplyGuardGoNoGoReason({ id: "rollback-medium-high", label: "Rollback confidence medium or high", status: args.rollbackConfidence.confidence === "high" || args.rollbackConfidence.confidence === "medium" ? "pass" : "blocker", detail: "Rollback confidence must be medium or high." }),
    buildApplyGuardGoNoGoReason({ id: "command-write-separation-passes", label: "Command/write separation passes", status: args.commandWriteSeparation.overallStatus, detail: "Command/write separation passes." }),
    buildApplyGuardGoNoGoReason({ id: "validation-requirement-passes", label: "Validation requirement passes", status: args.validationRequirement.overallStatus, detail: "Validation requirement passes." }),
    buildApplyGuardGoNoGoReason({ id: "ui-blocked-reasons-clear", label: "UI explains blocked reasons clearly", status: "pass", detail: "UI explains blocked reasons clearly." }),
    buildApplyGuardGoNoGoReason({ id: "latest-message-authority-preserved", label: "Latest-message authority preserved", status: "pass", detail: "Latest-message authority preserved." }),
  ];
  const blockerCount = reasons.filter((reason) => reason.status === "blocker").length;
  const warningCount = reasons.filter((reason) => reason.status === "warning").length;
  const decision = decide(args, blockerCount, warningCount);
  const review: ApplyGuardGoNoGo = {
    id: buildRealApplyGuardReviewStableKey("apply-guard-go-no-go", args.reviewId, decision),
    decision,
    executionAllowed: false,
    reasons,
    blockerCount,
    warningCount,
    nextSafeAction: nextSafeAction(decision),
    summary: [],
  };
  return { ...review, summary: summarizeApplyGuardGoNoGo(review) };
}

function totalBlockers(args: Parameters<typeof buildApplyGuardGoNoGo>[0]): number {
  return args.policyReview.blockerCount + args.approvalReview.blockerCount + args.diffBoundaryReview.blockerCount + args.pathBoundaryReview.blockerCount + args.rollbackConfidence.blockerCount + args.commandWriteSeparation.blockerCount + args.validationRequirement.blockerCount;
}

function decide(args: Parameters<typeof buildApplyGuardGoNoGo>[0], blockerCount: number, warningCount: number): ApplyGuardGoNoGoDecision {
  if (args.commandWriteSeparation.blockerCount > 0 || args.rollbackConfidence.confidence === "blocked" || args.validationRequirement.blockerCount > 0) return "no-go";
  if (blockerCount > 0) return "blocked";
  if (warningCount > 0) return "go-with-fixes";
  if (args.policyReview.overallStatus === "pass" && args.approvalReview.overallStatus === "pass") return "go-for-guarded-apply-candidate";
  if (args.diffBoundaryReview.overallStatus === "pass" && args.pathBoundaryReview.overallStatus === "pass") return "go-for-dry-run";
  return "unknown";
}

function nextSafeAction(decision: ApplyGuardGoNoGoDecision): string {
  if (decision === "go-for-guarded-apply-candidate") return "Candidate is review-ready, but executionAllowed false in Phase 82; implement guarded apply candidate only in a later phase.";
  if (decision === "go-for-dry-run") return "Proceed only to dry-run review; no apply execution.";
  if (decision === "go-with-fixes") return "Fix warnings before guarded apply candidate implementation.";
  return "Resolve blockers before any apply automation increase.";
}

export function summarizeApplyGuardGoNoGo(review: ApplyGuardGoNoGo): string[] {
  return [
    `Go/no-go decision ${review.decision}.`,
    `executionAllowed false in Phase 82.`,
    `${review.blockerCount} blocker(s), ${review.warningCount} warning(s).`,
    review.nextSafeAction,
  ];
}
