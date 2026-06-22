import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_DENIED_PATH_REVIEW_LANGUAGE =
  "Local change denied path review | Local change denied path review does not mutate files or run commands | Local change denied path review requires explicit operator approval | Denied path review explains blocked file writes commands env secrets traversal git mutation install deploy and runtime starts | Denied local change paths remain blocked | Local change denied path checklist | Go to Local Change Denied Path Review";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangeDeniedPathReviewStableKey };

export function buildLocalChangeDeniedPathReviewModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-denied-path-review");
}

export function summarizeLocalChangeDeniedPathReview(
  model = buildLocalChangeDeniedPathReviewModel()
): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
