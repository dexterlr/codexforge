import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const COCKPIT_EVIDENCE_EXPORT_PREVIEW_LANGUAGE =
  "Cockpit evidence export preview | Cockpit evidence export preview does not write export files | Evidence export preview requires explicit operator approval before future export | Export preview shows markdown json and bundle options as blocked previews | Denied cockpit evidence export paths remain blocked | Cockpit evidence export checklist | Go to Cockpit Evidence Export Preview";

export { buildCockpitEvidenceResultRecoveryStableKey as buildCockpitEvidenceExportPreviewStableKey };

export function buildCockpitEvidenceExportPreviewModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("cockpit-evidence-export-preview");
}

export function summarizeCockpitEvidenceExportPreview(model = buildCockpitEvidenceExportPreviewModel()): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

