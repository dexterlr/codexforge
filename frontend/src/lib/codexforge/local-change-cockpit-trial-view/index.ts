import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_COCKPIT_TRIAL_VIEW_LANGUAGE =
  "Local change cockpit trial view | Local change cockpit trial view does not write files or run commands | Local change cockpit trial view requires explicit operator approval | Cockpit trial view shows goal plan diff command approval evidence result recovery and audit in one place | Denied local change cockpit trial paths remain blocked | Local change cockpit trial checklist | Go to Local Change Cockpit Trial View";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangeCockpitTrialViewStableKey };

export function buildLocalChangeCockpitTrialViewModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-cockpit-trial-view");
}

export function summarizeLocalChangeCockpitTrialView(
  model = buildLocalChangeCockpitTrialViewModel()
): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
