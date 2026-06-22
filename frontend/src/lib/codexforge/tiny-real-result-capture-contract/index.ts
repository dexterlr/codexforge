import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const TINY_REAL_RESULT_CAPTURE_CONTRACT_LANGUAGE =
  "Tiny real result capture contract | Tiny real result capture contract does not persist results from the frontend | Tiny real result capture contract requires explicit operator approval | Result capture contract covers success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states | Denied tiny real result paths remain blocked | Tiny real result checklist | Go to Tiny Real Result Capture Contract";

export { buildTinyRealControlledTrialStableKey as buildTinyRealResultCaptureContractStableKey };

export function buildTinyRealResultCaptureContractModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("tiny-real-result-capture-contract");
}

export function summarizeTinyRealResultCaptureContract(
  model = buildTinyRealResultCaptureContractModel()
): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
