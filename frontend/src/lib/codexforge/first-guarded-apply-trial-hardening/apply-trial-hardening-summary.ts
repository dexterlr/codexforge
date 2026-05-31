import { buildApplyTrialReadiness } from "./apply-trial-readiness";
import { buildApplyTrialRiskCheck } from "./apply-trial-risk-check";
import { buildApplyTrialApprovalCheck } from "./apply-trial-approval-check";
import { buildApplyTrialBoundaryCheck } from "./apply-trial-boundary-check";
import { buildApplyTrialEvidenceCheck } from "./apply-trial-evidence-check";
import { buildApplyTrialRollbackCheck } from "./apply-trial-rollback-check";
import { buildApplyTrialValidationHandoff } from "./apply-trial-validation-handoff";
import type { ApplyTrialHardeningSummary } from "./first-guarded-apply-trial-types";
export function buildApplyTrialHardeningSummary(): ApplyTrialHardeningSummary {
  return { title: "Harden first apply trial", status: "review-required", primaryAction: "Review apply trial readiness", nextRoute: "/apply-evidence", items: [buildApplyTrialReadiness(), buildApplyTrialRiskCheck(), buildApplyTrialApprovalCheck(), buildApplyTrialBoundaryCheck(), buildApplyTrialEvidenceCheck(), buildApplyTrialRollbackCheck(), buildApplyTrialValidationHandoff()] };
}
export function summarizeApplyTrialHardeningSession(): string { return "Harden first apply trial remains manual, review-gated, and demo-ready-with-notes until a human records evidence."; }
