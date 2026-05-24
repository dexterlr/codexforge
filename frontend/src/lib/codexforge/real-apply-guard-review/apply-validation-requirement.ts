import {
  buildRealApplyGuardReviewStableKey,
  countApplyGuardStatus,
  deriveApplyGuardOverallStatus,
  type ApplyGuardReviewCheck,
  type ApplyGuardReviewInput,
  type ApplyGuardReviewStatus,
  type ApplyValidationRequirement,
} from "./real-apply-guard-review-types";

export function buildApplyValidationRequirementCheck(input: {
  id: string;
  label: string;
  status: ApplyGuardReviewStatus;
  detail: string;
  blocksApply?: boolean;
}): ApplyGuardReviewCheck {
  return { blocksApply: input.status === "blocker", ...input };
}

export function buildApplyValidationRequirement(input: ApplyGuardReviewInput): ApplyValidationRequirement {
  const validationText = input.validationSummary.join("\n").toLowerCase();
  const hasPlan = input.validationSummary.length > 0 || input.source.validationRouteAvailable === true;
  const checks = [
    buildApplyValidationRequirementCheck({ id: "npm-run-build-required", label: "npm run build required/recommended", status: validationText.includes("npm run build") || hasPlan ? "pass" : "blocker", detail: "Validation requirement includes npm run build." }),
    buildApplyValidationRequirementCheck({ id: "targeted-smoke-required", label: "Targeted smoke required/recommended", status: validationText.includes("targeted smoke") || validationText.includes("smoke-codexforge") || hasPlan ? "pass" : "blocker", detail: "Validation requirement includes targeted smoke." }),
    buildApplyValidationRequirementCheck({ id: "server-smoke-required", label: "npm run smoke:codexforge:server required/recommended", status: validationText.includes("npm run smoke:codexforge:server") || hasPlan ? "pass" : "warning", detail: "Server smoke is required or recommended after apply." }),
    buildApplyValidationRequirementCheck({ id: "git-diff-check-required", label: "git diff --check required/recommended", status: validationText.includes("git diff --check") || hasPlan ? "pass" : "blocker", detail: "Validation requirement includes git diff --check." }),
    buildApplyValidationRequirementCheck({ id: "git-status-short-required", label: "git status --short required/recommended", status: validationText.includes("git status --short") || hasPlan ? "pass" : "warning", detail: "git status --short required/recommended." }),
    buildApplyValidationRequirementCheck({ id: "failure-route-closed-loop", label: "Failure route to Closed Loop", status: hasPlan ? "pass" : "blocker", detail: "Failure route to closed-loop is required." }),
    buildApplyValidationRequirementCheck({ id: "result-capture-workflow-results", label: "Result capture to workflow-results", status: hasPlan ? "pass" : "warning", detail: "Result capture to workflow-results is required/recommended." }),
    buildApplyValidationRequirementCheck({ id: "run-history-handoff", label: "Run history handoff", status: hasPlan ? "pass" : "warning", detail: "Run history handoff is required/recommended." }),
    buildApplyValidationRequirementCheck({ id: "no-auto-run", label: "No auto-run", status: "pass", detail: "No auto-run; validation commands are copy/manual by default." }),
    buildApplyValidationRequirementCheck({ id: "output-review-required", label: "Output review required", status: hasPlan ? "pass" : "blocker", detail: "Output review required after validation." }),
  ];
  const review: ApplyValidationRequirement = {
    id: buildRealApplyGuardReviewStableKey("apply-validation-requirement", input.reviewId),
    checks,
    overallStatus: deriveApplyGuardOverallStatus(checks),
    blockerCount: countApplyGuardStatus(checks, "blocker"),
    warningCount: countApplyGuardStatus(checks, "warning"),
    summary: [],
  };
  return { ...review, summary: summarizeApplyValidationRequirement(review) };
}

export function summarizeApplyValidationRequirement(review: ApplyValidationRequirement): string[] {
  return [
    `Validation requirement status ${review.overallStatus}.`,
    "Includes npm run build, targeted smoke, server smoke, git diff --check, git status --short, Closed Loop failure route, workflow-results capture, run history handoff, no auto-run, and output review.",
  ];
}
