import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const FILE_IMPACT_EXPECTATION_PREVIEW_LANGUAGE =
  "File impact expectation preview | File impact expectation preview does not write files | File impact expectation preview requires explicit operator approval | File impact expectation preview describes likely new modified reviewed blocked and rollback-relevant files | Denied file impact expectation paths remain blocked | File impact expectation checklist | Go to File Impact Expectation Preview";

export function buildFileImpactExpectationPreviewModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("file-impact-expectation-preview");
}

export function summarizeFileImpactExpectationPreview(model = buildFileImpactExpectationPreviewModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
