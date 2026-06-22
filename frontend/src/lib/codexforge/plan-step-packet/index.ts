import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const PLAN_STEP_PACKET_LANGUAGE =
  "Plan step packet | Plan step packet does not execute steps | Plan step packet requires explicit operator approval before execution | Plan step packet previews ordered actions dependencies risks files commands evidence and done criteria | Denied plan step paths remain blocked | Plan step checklist | Go to Plan Step Packet";

export function buildPlanStepPacketModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("plan-step-packet");
}

export function summarizePlanStepPacket(model = buildPlanStepPacketModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
