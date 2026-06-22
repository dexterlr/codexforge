import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const RESULT_EXPECTATION_PACKET_LANGUAGE =
  "Result expectation packet | Result expectation packet does not claim execution happened | Result expectation packet requires explicit operator approval before execution | Result expectation packet defines success blocked denied failed timeout manual-review retryable recovered and operator-accepted outcomes | Denied result expectation packet paths remain blocked | Result expectation checklist | Go to Result Expectation Packet";

export function buildResultExpectationPacketModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("result-expectation-packet");
}

export function summarizeResultExpectationPacket(model = buildResultExpectationPacketModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
