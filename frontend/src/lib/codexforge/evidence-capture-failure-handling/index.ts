import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const EVIDENCE_CAPTURE_FAILURE_HANDLING_LANGUAGE =
  "Evidence capture failure handling | Evidence capture failure handling does not persist evidence from the UI | Evidence capture failure handling requires explicit operator approval | Evidence capture failure handling previews missing stdout stderr exit code diff approval redaction operator audit and queue references | Evidence capture recovery remains blocked | Evidence capture failure checklist | Go to Evidence Capture Failure Handling";

export { buildRealTrialHardeningStableKey as buildEvidenceCaptureFailureHandlingStableKey };

export function buildEvidenceCaptureFailureHandlingModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("evidence-capture-failure-handling");
}

export function summarizeEvidenceCaptureFailureHandling(
  model = buildEvidenceCaptureFailureHandlingModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
