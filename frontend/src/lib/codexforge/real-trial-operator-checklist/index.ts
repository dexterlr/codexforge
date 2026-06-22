import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_OPERATOR_CHECKLIST_LANGUAGE =
  "Real trial operator checklist | Real trial operator checklist does not mark real work complete | Real trial operator checklist requires explicit operator approval | Operator checklist confirms goal context file write command approval hold evidence result recovery audit and denied paths | Denied real trial operator checklist paths remain blocked | Real trial operator checklist | Go to Real Trial Operator Checklist";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialOperatorChecklistStableKey };

export function buildRealTrialOperatorChecklistModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-operator-checklist");
}

export function summarizeRealTrialOperatorChecklist(model = buildRealTrialOperatorChecklistModel()): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
