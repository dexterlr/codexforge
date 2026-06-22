import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const AUDIT_CAPTURE_FAILURE_HANDLING_LANGUAGE =
  "Audit capture failure handling | Audit capture failure handling does not persist audit logs from the UI | Audit capture failure handling requires explicit operator approval | Audit capture failure handling previews missing goal plan diff apply command approval evidence result recovery queue operator and denied-path records | Audit capture recovery remains blocked | Audit capture failure checklist | Go to Audit Capture Failure Handling";

export { buildRealTrialHardeningStableKey as buildAuditCaptureFailureHandlingStableKey };

export function buildAuditCaptureFailureHandlingModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("audit-capture-failure-handling");
}

export function summarizeAuditCaptureFailureHandling(
  model = buildAuditCaptureFailureHandlingModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
