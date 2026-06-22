import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_APPROVAL_VERIFICATION_LANGUAGE =
  "Dry-run approval verification | Dry-run approval verification does not persist approvals or release execution | Dry-run approval verification requires explicit human approval | Approval verification previews operator identity approval scope expiry denied paths replay protection and backend authorization checks | Denied dry-run approval verification paths remain blocked | Dry-run approval verification checklist | Go to Dry-Run Approval Verification";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunApprovalVerificationStableKey };

export function buildDryRunApprovalVerificationModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-approval-verification");
}

export function summarizeDryRunApprovalVerification(
  model = buildDryRunApprovalVerificationModel()
): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
