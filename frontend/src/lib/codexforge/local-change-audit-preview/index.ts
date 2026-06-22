import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_AUDIT_PREVIEW_LANGUAGE =
  "Local change audit preview | Local change audit preview does not persist audit logs | Local change audit preview requires explicit operator approval before future persistence | Audit preview shows goal plan approval evidence result recovery and operator placeholders | Denied local change audit paths remain blocked | Local change audit checklist | Go to Local Change Audit Preview";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangeAuditPreviewStableKey };

export function buildLocalChangeAuditPreviewModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-audit-preview");
}

export function summarizeLocalChangeAuditPreview(model = buildLocalChangeAuditPreviewModel()): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
