import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const TARGET_ARTIFACT_PREVIEW_LANGUAGE =
  "Target artifact preview | Target artifact preview does not create artifacts | Target artifact preview requires explicit operator approval before execution | Target artifact preview identifies expected files app surfaces reports configs dashboards game server plans docs or creative packs | Denied target artifact paths remain blocked | Target artifact checklist | Go to Target Artifact Preview";

export function buildTargetArtifactPreviewModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("target-artifact-preview");
}

export function summarizeTargetArtifactPreview(model = buildTargetArtifactPreviewModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
