import {
  buildCockpitEvidenceResultRecoveryRouteModel,
  buildCockpitEvidenceResultRecoveryStableKey,
  summarizeCockpitEvidenceResultRecoveryRouteModel,
  type CockpitEvidenceResultRecoveryRouteModel,
} from "../cockpit-evidence-result-recovery";

export const COCKPIT_RETRY_PREVIEW_VIEW_LANGUAGE =
  "Cockpit retry preview view | Cockpit retry preview view does not execute retry | Retry preview requires explicit operator approval before future retry | Retry preview shows guarded command retry and file-write retry as blocked previews | Denied cockpit retry paths remain blocked | Cockpit retry preview checklist | Go to Cockpit Retry Preview View";

export { buildCockpitEvidenceResultRecoveryStableKey as buildCockpitRetryPreviewViewStableKey };

export function buildCockpitRetryPreviewViewModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("cockpit-retry-preview-view");
}

export function summarizeCockpitRetryPreviewView(model = buildCockpitRetryPreviewViewModel()): string {
  return summarizeCockpitEvidenceResultRecoveryRouteModel(model);
}

