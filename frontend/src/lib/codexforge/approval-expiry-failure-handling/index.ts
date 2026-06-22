import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const APPROVAL_EXPIRY_FAILURE_HANDLING_LANGUAGE =
  "Approval expiry failure handling | Approval expiry failure handling does not persist approvals | Approval expiry failure handling requires explicit human re-approval | Approval expiry failure handling blocks stale expired mismatched replayed and scope-invalid approval tickets | Expired approval recovery remains blocked | Approval expiry failure checklist | Go to Approval Expiry Failure Handling";

export { buildRealTrialHardeningStableKey as buildApprovalExpiryFailureHandlingStableKey };

export function buildApprovalExpiryFailureHandlingModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("approval-expiry-failure-handling");
}

export function summarizeApprovalExpiryFailureHandling(
  model = buildApprovalExpiryFailureHandlingModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
