import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_PROJECT_CONTEXT_PACKET_LANGUAGE =
  "Real trial project context packet | Real trial project context packet does not browse arbitrary files or read secrets | Real trial project context requires explicit operator approval before future indexing | Project context packet shows bounded workspace context without exposing secret values | Denied real trial project context paths remain blocked | Real trial project context checklist | Go to Real Trial Project Context Packet";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialProjectContextPacketStableKey };

export function buildRealTrialProjectContextPacketModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-project-context-packet");
}

export function summarizeRealTrialProjectContextPacket(
  model = buildRealTrialProjectContextPacketModel()
): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
