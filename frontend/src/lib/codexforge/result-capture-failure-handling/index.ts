import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const RESULT_CAPTURE_FAILURE_HANDLING_LANGUAGE =
  "Result capture failure handling | Result capture failure handling does not persist results from the UI | Result capture failure handling requires explicit operator approval | Result capture failure handling previews missing success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states | Result capture recovery remains blocked | Result capture failure checklist | Go to Result Capture Failure Handling";

export { buildRealTrialHardeningStableKey as buildResultCaptureFailureHandlingStableKey };

export function buildResultCaptureFailureHandlingModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("result-capture-failure-handling");
}

export function summarizeResultCaptureFailureHandling(
  model = buildResultCaptureFailureHandlingModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
