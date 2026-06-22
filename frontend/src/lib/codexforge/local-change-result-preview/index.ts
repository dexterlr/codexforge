import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_RESULT_PREVIEW_LANGUAGE =
  "Local change result preview | Local change result preview does not persist results | Local change result preview requires explicit operator approval before future persistence | Result preview shows success denied blocked failed timeout and needs-review states | Denied local change result paths remain blocked | Local change result checklist | Go to Local Change Result Preview";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangeResultPreviewStableKey };

export function buildLocalChangeResultPreviewModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-result-preview");
}

export function summarizeLocalChangeResultPreview(
  model = buildLocalChangeResultPreviewModel()
): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
