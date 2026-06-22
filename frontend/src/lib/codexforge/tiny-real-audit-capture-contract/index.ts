import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const TINY_REAL_AUDIT_CAPTURE_CONTRACT_LANGUAGE =
  "Tiny real audit capture contract | Tiny real audit capture contract does not persist audit logs from the frontend | Tiny real audit capture contract requires explicit operator approval | Audit capture contract covers goal plan diff apply command approval evidence result recovery queue operator and denied-path records | Denied tiny real audit paths remain blocked | Tiny real audit checklist | Go to Tiny Real Audit Capture Contract";

export { buildTinyRealControlledTrialStableKey as buildTinyRealAuditCaptureContractStableKey };

export function buildTinyRealAuditCaptureContractModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("tiny-real-audit-capture-contract");
}

export function summarizeTinyRealAuditCaptureContract(
  model = buildTinyRealAuditCaptureContractModel()
): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
