import { type TrialReviewSummary } from "./coding-flow-trial-review-types";
import { buildTrialFrictionLog } from "./trial-friction-log";
import { buildTrialGoNoGoDecision } from "./trial-go-no-go-decision";
import { buildTrialPassFailChecklist } from "./trial-pass-fail-checklist";
import { buildTrialRunRecord } from "./trial-run-record";
import { buildTrialSafetyReview } from "./trial-safety-review";
import { buildTrialUxFixPlan } from "./trial-ux-fix-plan";
import { buildTrialValidationReview } from "./trial-validation-review";

export function buildTrialReviewSummary(): TrialReviewSummary {
  const record = buildTrialRunRecord();
  const checklist = buildTrialPassFailChecklist();
  const friction = buildTrialFrictionLog();
  const safety = buildTrialSafetyReview();
  const validation = buildTrialValidationReview();
  const decision = buildTrialGoNoGoDecision({ checklist, safety });
  const fixPlan = buildTrialUxFixPlan();
  return {
    summaryId: "trial-review-summary",
    trialStatus: record.finalTrialStatus,
    checklistPassCount: checklist.items.filter((item) => item.status === "pass").length,
    checklistFailCount: checklist.items.filter((item) => item.status === "fail" || item.status === "blocked").length,
    frictionCount: friction.items.length,
    blockerCount: friction.items.filter((item) => item.severity === "blocker").length + safety.checks.filter((check) => check.status === "blocker").length,
    safetyStatus: safety.overallStatus,
    validationStatus: validation.overallStatus,
    goNoGoDecision: decision.output,
    topNextFix: fixPlan.items.find((item) => item.priority === "now")?.title ?? "Review trial notes",
  };
}

export function summarizeTrialReviewSession(summary = buildTrialReviewSummary()): string {
  return `${summary.trialStatus}: ${summary.goNoGoDecision}, ${summary.frictionCount} friction items, top fix ${summary.topNextFix}.`;
}
