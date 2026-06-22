import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_GOAL_INTAKE_PACKET_LANGUAGE =
  "Build fix goal intake packet | Build fix goal intake packet does not send prompts or call models | Build fix goal intake requires explicit operator approval before future model routing | Goal intake supports apps websites dashboards games tools research workflows data integrations and general local projects | Denied build fix goal intake paths remain blocked | Build fix goal intake checklist | Go to Build Fix Goal Intake Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixGoalIntakePacketStableKey };

export function buildBuildFixGoalIntakePacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-goal-intake-packet");
}

export function summarizeBuildFixGoalIntakePacket(model = buildBuildFixGoalIntakePacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
