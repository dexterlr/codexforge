import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const FIRST_END_TO_END_BUILD_FIX_CANDIDATE_LANGUAGE =
  "First end-to-end build fix candidate | First end-to-end build fix candidate does not call models write files run commands persist evidence or execute recovery | First end-to-end build fix candidate requires explicit operator approval | Candidate combines goal context plan diff command risk approval holds evidence result recovery audit and cockpit flow | Denied first end-to-end build fix paths remain blocked | First end-to-end build fix checklist | Go to First End to End Build Fix Candidate";

export { buildEndToEndBuildFixWorkflowStableKey as buildFirstEndToEndBuildFixCandidateStableKey };

export function buildFirstEndToEndBuildFixCandidateModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("first-end-to-end-build-fix-candidate");
}

export function summarizeFirstEndToEndBuildFixCandidate(model = buildFirstEndToEndBuildFixCandidateModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
