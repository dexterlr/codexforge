import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const COCKPIT_ROLLBACK_PREVIEW_VIEW_LANGUAGE =
  "Cockpit rollback preview view | Cockpit rollback preview view does not execute rollback | Rollback preview requires explicit operator approval before future rollback | Rollback preview shows reverse file write and restore plan without mutation | Denied cockpit rollback paths remain blocked | Cockpit rollback preview checklist | Go to Cockpit Rollback Preview View";

export { buildCockpitEvidenceResultRecoveryStableKey as buildCockpitRollbackPreviewViewStableKey };

export function buildCockpitRollbackPreviewViewModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("cockpit-rollback-preview-view");
}

export function summarizeCockpitRollbackPreviewView(model = buildCockpitRollbackPreviewViewModel()): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

