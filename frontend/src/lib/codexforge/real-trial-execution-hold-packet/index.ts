import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  summarizeRealControlledOperatorTrialPacketRouteModel,
  type RealControlledOperatorTrialPacketRouteModel,
} from "../real-controlled-operator-trial-packet";

export const REAL_TRIAL_EXECUTION_HOLD_PACKET_LANGUAGE =
  "Real trial execution hold packet | Real trial execution hold packet does not release execution locks | Real trial execution hold packet requires explicit operator approval | Execution hold packet keeps file writes commands models providers connectors runtimes adapters persistence recovery exports queues and memory promotion blocked | Denied real trial execution hold paths remain blocked | Real trial execution hold checklist | Go to Real Trial Execution Hold Packet";

export { buildRealControlledOperatorTrialPacketStableKey as buildRealTrialExecutionHoldPacketStableKey };

export function buildRealTrialExecutionHoldPacketModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("real-trial-execution-hold-packet");
}

export function summarizeRealTrialExecutionHoldPacket(
  model = buildRealTrialExecutionHoldPacketModel()
): string {
  return summarizeRealControlledOperatorTrialPacketRouteModel(model);
}
