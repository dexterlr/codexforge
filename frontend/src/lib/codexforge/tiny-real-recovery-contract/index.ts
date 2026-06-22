import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const TINY_REAL_RECOVERY_CONTRACT_LANGUAGE =
  "Tiny real recovery contract | Tiny real recovery contract does not execute recovery from the frontend | Tiny real recovery contract requires explicit operator approval | Recovery contract covers rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery requirements | Denied tiny real recovery paths remain blocked | Tiny real recovery checklist | Go to Tiny Real Recovery Contract";

export { buildTinyRealControlledTrialStableKey as buildTinyRealRecoveryContractStableKey };

export function buildTinyRealRecoveryContractModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("tiny-real-recovery-contract");
}

export function summarizeTinyRealRecoveryContract(
  model = buildTinyRealRecoveryContractModel()
): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
