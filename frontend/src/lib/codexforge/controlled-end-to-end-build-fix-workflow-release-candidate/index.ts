import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const CONTROLLED_END_TO_END_BUILD_FIX_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE =
  "Controlled end-to-end build fix workflow release candidate | Controlled end-to-end build fix workflow release candidate does not call models write files run commands persist results or execute recovery | Controlled end-to-end build fix workflow release requires explicit operator approval | Release candidate moves CodexForge toward the first usable controlled build fix loop | Denied controlled end-to-end build fix workflow paths remain blocked | Controlled end-to-end build fix workflow release checklist | Go to Controlled End to End Build Fix Workflow Release Candidate";

export { buildEndToEndBuildFixWorkflowStableKey as buildControlledEndToEndBuildFixWorkflowReleaseCandidateStableKey };

export function buildControlledEndToEndBuildFixWorkflowReleaseCandidateModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("controlled-end-to-end-build-fix-workflow-release-candidate");
}

export function summarizeControlledEndToEndBuildFixWorkflowReleaseCandidate(model = buildControlledEndToEndBuildFixWorkflowReleaseCandidateModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
