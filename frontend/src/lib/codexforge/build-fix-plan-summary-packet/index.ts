import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_PLAN_SUMMARY_PACKET_LANGUAGE =
  "Build fix plan summary packet | Build fix plan summary packet does not execute plans | Build fix plan summary requires explicit operator approval before future execution | Plan summary shows file diff command preview risk evidence result and recovery steps | Denied build fix plan paths remain blocked | Build fix plan summary checklist | Go to Build Fix Plan Summary Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixPlanSummaryPacketStableKey };

export function buildBuildFixPlanSummaryPacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-plan-summary-packet");
}

export function summarizeBuildFixPlanSummaryPacket(model = buildBuildFixPlanSummaryPacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
