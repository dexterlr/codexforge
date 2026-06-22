import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_AUDIT_CONTRACT_LANGUAGE =
  "Backend guarded audit contract | Backend guarded audit contract does not persist audit logs | Backend guarded audit requires explicit operator approval | Audit contract defines goal plan diff apply command approval evidence result recovery queue operator and denied-path records | Denied backend guarded audit paths remain blocked | Backend guarded audit checklist | Go to Backend Guarded Audit Contract";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedAuditContractStableKey };

export function buildBackendGuardedAuditContractModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-audit-contract");
}

export function summarizeBackendGuardedAuditContract(
  model = buildBackendGuardedAuditContractModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
