import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const END_TO_END_BUILD_FIX_WORKFLOW_BOUNDARY_LANGUAGE =
  "End-to-end build fix workflow boundary | End-to-end build fix workflow boundary does not call models write files or run commands | End-to-end build fix workflow requires explicit operator approval | Workflow unifies goal context plan diff command risk approval evidence result recovery and audit | Denied end-to-end build fix workflow paths remain blocked | End-to-end build fix workflow checklist | Go to End to End Build Fix Workflow Boundary";

export { buildEndToEndBuildFixWorkflowStableKey as buildEndToEndBuildFixWorkflowBoundaryStableKey };

export function buildEndToEndBuildFixWorkflowBoundaryModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("end-to-end-build-fix-workflow-boundary");
}

export function summarizeEndToEndBuildFixWorkflowBoundary(model = buildEndToEndBuildFixWorkflowBoundaryModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
