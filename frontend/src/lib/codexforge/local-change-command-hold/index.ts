import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_COMMAND_HOLD_LANGUAGE =
  "Local change command hold | Local change command hold does not run commands | Local change command hold requires explicit operator approval | Command hold keeps command execution blocked | Denied local change command hold paths remain blocked | Local change command hold checklist | Go to Local Change Command Hold";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangeCommandHoldStableKey };

export function buildLocalChangeCommandHoldModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-command-hold");
}

export function summarizeLocalChangeCommandHold(model = buildLocalChangeCommandHoldModel()): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
