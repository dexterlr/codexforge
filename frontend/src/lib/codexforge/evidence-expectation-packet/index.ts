import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const EVIDENCE_EXPECTATION_PACKET_LANGUAGE =
  "Evidence expectation packet | Evidence expectation packet does not persist evidence from the UI | Evidence expectation packet requires explicit operator approval | Evidence expectation packet lists required diff command stdout stderr exit code approval result audit recovery and model tool evidence | Denied evidence expectation paths remain blocked | Evidence expectation checklist | Go to Evidence Expectation Packet";

export function buildEvidenceExpectationPacketModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("evidence-expectation-packet");
}

export function summarizeEvidenceExpectationPacket(model = buildEvidenceExpectationPacketModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
