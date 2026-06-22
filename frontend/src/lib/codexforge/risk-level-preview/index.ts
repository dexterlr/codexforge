import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const RISK_LEVEL_PREVIEW_LANGUAGE =
  "Risk level preview | Risk level preview does not execute safety scans from the UI | Risk level preview requires explicit operator approval | Risk level preview classifies low medium high and blocked risks across files commands models providers connectors runtimes secrets installs deploys persistence and recovery | Denied risk level paths remain blocked | Risk level checklist | Go to Risk Level Preview";

export function buildRiskLevelPreviewModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("risk-level-preview");
}

export function summarizeRiskLevelPreview(model = buildRiskLevelPreviewModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
