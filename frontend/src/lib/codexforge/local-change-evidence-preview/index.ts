import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_EVIDENCE_PREVIEW_LANGUAGE =
  "Local change evidence preview | Local change evidence preview does not persist evidence | Local change evidence preview requires explicit operator approval before future persistence | Evidence preview shows file diff command stdout stderr exit code approval and operator placeholders | Denied local change evidence paths remain blocked | Local change evidence checklist | Go to Local Change Evidence Preview";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangeEvidencePreviewStableKey };

export function buildLocalChangeEvidencePreviewModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-evidence-preview");
}

export function summarizeLocalChangeEvidencePreview(
  model = buildLocalChangeEvidencePreviewModel()
): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
