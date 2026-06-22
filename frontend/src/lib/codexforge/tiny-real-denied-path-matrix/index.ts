import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const TINY_REAL_DENIED_PATH_MATRIX_LANGUAGE =
  "Tiny real denied path matrix | Tiny real denied path matrix does not mutate workflow state | Tiny real denied path matrix requires explicit operator approval | Denied path matrix lists blocked prompts models providers connectors arbitrary files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets memory promotion and broad backend execution | Denied tiny real paths remain blocked | Tiny real denied path checklist | Go to Tiny Real Denied Path Matrix";

export { buildTinyRealControlledTrialStableKey as buildTinyRealDeniedPathMatrixStableKey };

export function buildTinyRealDeniedPathMatrixModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("tiny-real-denied-path-matrix");
}

export function summarizeTinyRealDeniedPathMatrix(
  model = buildTinyRealDeniedPathMatrixModel()
): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
