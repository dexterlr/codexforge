import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const TINY_REAL_PATH_GUARD_LANGUAGE =
  "Tiny real path guard | Tiny real path guard does not browse arbitrary files or write files from the frontend | Tiny real path guard requires explicit operator approval | Path guard checks workspace root containment traversal denial generated file policy binary guard and rollback readiness | Denied tiny real path guard paths remain blocked | Tiny real path guard checklist | Go to Tiny Real Path Guard";

export { buildTinyRealControlledTrialStableKey as buildTinyRealPathGuardStableKey };

export function buildTinyRealPathGuardModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("tiny-real-path-guard");
}

export function summarizeTinyRealPathGuard(model = buildTinyRealPathGuardModel()): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
