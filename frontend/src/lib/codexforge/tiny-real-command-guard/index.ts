import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const TINY_REAL_COMMAND_GUARD_LANGUAGE =
  "Tiny real command guard | Tiny real command guard does not run commands from the frontend | Tiny real command guard requires explicit operator approval | Command guard checks allowlist arguments working directory environment-name-only display timeout cancellation stdout stderr and exit-code capture | Denied tiny real command guard paths remain blocked | Tiny real command guard checklist | Go to Tiny Real Command Guard";

export { buildTinyRealControlledTrialStableKey as buildTinyRealCommandGuardStableKey };

export function buildTinyRealCommandGuardModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("tiny-real-command-guard");
}

export function summarizeTinyRealCommandGuard(model = buildTinyRealCommandGuardModel()): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
