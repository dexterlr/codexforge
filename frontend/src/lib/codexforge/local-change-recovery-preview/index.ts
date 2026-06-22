import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const LOCAL_CHANGE_RECOVERY_PREVIEW_LANGUAGE =
  "Local change recovery preview | Local change recovery preview does not execute recovery | Local change recovery preview requires explicit operator approval before future recovery | Recovery preview shows rollback retry stop restore and explain-failure options | Denied local change recovery paths remain blocked | Local change recovery checklist | Go to Local Change Recovery Preview";

export { buildFirstLocalChangeTrialStableKey as buildLocalChangeRecoveryPreviewStableKey };

export function buildLocalChangeRecoveryPreviewModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("local-change-recovery-preview");
}

export function summarizeLocalChangeRecoveryPreview(
  model = buildLocalChangeRecoveryPreviewModel()
): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
