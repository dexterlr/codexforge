import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const TINY_REAL_EVIDENCE_CAPTURE_CONTRACT_LANGUAGE =
  "Tiny real evidence capture contract | Tiny real evidence capture contract does not persist evidence from the frontend | Tiny real evidence capture contract requires explicit operator approval | Evidence capture contract covers diff command stdout stderr exit code approval timestamp redaction operator audit and queue references | Denied tiny real evidence paths remain blocked | Tiny real evidence checklist | Go to Tiny Real Evidence Capture Contract";

export { buildTinyRealControlledTrialStableKey as buildTinyRealEvidenceCaptureContractStableKey };

export function buildTinyRealEvidenceCaptureContractModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("tiny-real-evidence-capture-contract");
}

export function summarizeTinyRealEvidenceCaptureContract(
  model = buildTinyRealEvidenceCaptureContractModel()
): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
