import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const RAW_GOAL_INTAKE_PACKET_LANGUAGE =
  "Raw goal intake packet | Raw goal intake packet does not execute the goal | Raw goal intake packet requires explicit operator approval before execution | Raw goal intake normalizes operator goal text into a review-only packet | Denied raw goal intake paths remain blocked | Raw goal intake checklist | Go to Raw Goal Intake Packet";

export function buildRawGoalIntakePacketModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("raw-goal-intake-packet");
}

export function summarizeRawGoalIntakePacket(model = buildRawGoalIntakePacketModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
