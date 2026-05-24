import {
  buildRealApplyGuardReviewStableKey,
  countApplyGuardStatus,
  type ApplyGuardReviewInput,
  type ApplyGuardReviewStatus,
  type ApplyRollbackConfidence,
  type ApplyRollbackConfidenceItem,
  type ApplyGuardRollbackConfidenceLevel,
} from "./real-apply-guard-review-types";

export function buildApplyRollbackConfidenceItem(input: {
  id: string;
  label: string;
  status: ApplyGuardReviewStatus;
  detail: string;
  confidenceContribution?: ApplyGuardRollbackConfidenceLevel;
  blocksApply?: boolean;
}): ApplyRollbackConfidenceItem {
  return {
    confidenceContribution: input.confidenceContribution ?? (input.status === "pass" ? "medium" : input.status === "blocker" ? "blocked" : "low"),
    blocksApply: input.status === "blocker",
    ...input,
  };
}

export function buildApplyRollbackConfidence(input: ApplyGuardReviewInput): ApplyRollbackConfidence {
  const rollbackEvidence = input.rollbackSummary.join("\n").toLowerCase();
  const hasGitRestore = rollbackEvidence.includes("git restore") || input.source.rollbackAvailable === true;
  const hasGitRevert = rollbackEvidence.includes("git revert") || input.source.rollbackAvailable === true;
  const items = [
    buildApplyRollbackConfidenceItem({ id: "clean-working-tree-recommended", label: "Clean working tree recommended", status: input.source.cleanWorkingTree === false ? "warning" : "pass", detail: "Clean working tree recommended before apply." }),
    buildApplyRollbackConfidenceItem({ id: "pre-apply-diff-reviewed", label: "Pre-apply diff reviewed", status: input.diffSummary.length > 0 || !!input.source.diffText ? "pass" : "blocker", detail: "Pre-apply diff reviewed." }),
    buildApplyRollbackConfidenceItem({ id: "rollback-command-guidance-present", label: "Rollback command guidance present", status: input.rollbackSummary.length > 0 || input.source.rollbackAvailable === true ? "pass" : "blocker", detail: "Rollback command guidance present." }),
    buildApplyRollbackConfidenceItem({ id: "git-restore-target-file-guidance", label: "git restore target file guidance", status: hasGitRestore ? "pass" : "warning", detail: "Rollback confidence mentions git restore -- <target-file>." }),
    buildApplyRollbackConfidenceItem({ id: "git-restore-staged-guidance", label: "git restore staged guidance", status: hasGitRestore ? "pass" : "warning", detail: "Rollback confidence mentions git restore --staged guidance." }),
    buildApplyRollbackConfidenceItem({ id: "git-revert-commit-guidance", label: "git revert commit guidance", status: hasGitRevert ? "pass" : "warning", detail: "Rollback confidence mentions git revert <commit-sha>." }),
    buildApplyRollbackConfidenceItem({ id: "partial-apply-failure-guidance", label: "Partial apply failure guidance", status: input.rollbackSummary.length > 0 ? "pass" : "warning", detail: "Partial apply failure guidance is present when rollback summary exists." }),
    buildApplyRollbackConfidenceItem({ id: "validation-fail-rollback-guidance", label: "Validation fail rollback guidance", status: input.validationSummary.length > 0 ? "pass" : "warning", detail: "Validation fail rollback guidance routes to Closed Loop without auto-fix." }),
    buildApplyRollbackConfidenceItem({ id: "evidence-capture-before-rollback", label: "Evidence capture before rollback", status: input.validationSummary.length > 0 ? "pass" : "warning", detail: "Capture diff and validation output before rollback." }),
    buildApplyRollbackConfidenceItem({ id: "operator-understands-rollback-limits", label: "Operator understands rollback limits", status: input.rollbackSummary.length > 0 ? "pass" : "warning", detail: "Operator understands rollback limits." }),
  ];
  const blockerCount = countApplyGuardStatus(items, "blocker");
  const warningCount = countApplyGuardStatus(items, "warning");
  const passCount = countApplyGuardStatus(items, "pass");
  const confidence: ApplyGuardRollbackConfidenceLevel =
    blockerCount > 0 ? "blocked" : passCount >= 8 ? "high" : passCount >= 5 ? "medium" : warningCount > 0 ? "low" : "unknown";
  const review: ApplyRollbackConfidence = {
    id: buildRealApplyGuardReviewStableKey("apply-rollback-confidence", input.reviewId),
    items,
    confidence,
    blockerCount,
    warningCount,
    summary: [],
  };
  return { ...review, summary: summarizeApplyRollbackConfidence(review) };
}

export function summarizeApplyRollbackConfidence(review: ApplyRollbackConfidence): string[] {
  return [
    `Rollback confidence ${review.confidence}.`,
    "Includes clean tree recommendation, pre-apply diff, rollback command guidance, git restore, git restore --staged, git revert, partial apply failure, validation fail rollback, evidence capture, and rollback limits.",
  ];
}
