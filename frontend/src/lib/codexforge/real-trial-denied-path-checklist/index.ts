import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_DENIED_PATH_CHECKLIST_LANGUAGE =
  "Real trial denied path checklist | Real trial denied path checklist does not mutate workflow state | Real trial denied path checklist requires explicit operator approval | Denied path checklist lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets and memory promotion | Denied real trial checklist paths remain blocked | Real trial denied path checklist | Go to Real Trial Denied Path Checklist";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialDeniedPathChecklistStableKey };

export function buildRealTrialDeniedPathChecklistModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-denied-path-checklist");
}

export function summarizeRealTrialDeniedPathChecklist(
  model = buildRealTrialDeniedPathChecklistModel()
): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
