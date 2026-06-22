import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_APPLY_HOLD_LANGUAGE =
  "Local change apply hold | Local change apply hold does not write files | Local change apply hold requires explicit operator approval | Apply hold keeps file mutation blocked | Denied local change apply paths remain blocked | Local change apply hold checklist | Go to Local Change Apply Hold";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangeApplyHoldStableKey };

export function buildLocalChangeApplyHoldModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-apply-hold");
}

export function summarizeLocalChangeApplyHold(model = buildLocalChangeApplyHoldModel()): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
