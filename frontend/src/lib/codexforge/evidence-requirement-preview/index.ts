import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const EVIDENCE_REQUIREMENT_PREVIEW_LANGUAGE =
  "Evidence requirement preview | Evidence requirement preview does not persist evidence from the UI | Evidence requirement preview requires explicit operator approval | Evidence requirement preview lists required diff command stdout stderr exit code approval result audit and recovery evidence | Denied evidence requirement paths remain blocked | Evidence requirement checklist | Go to Evidence Requirement Preview";

export function buildEvidenceRequirementPreviewModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("evidence-requirement-preview");
}

export function summarizeEvidenceRequirementPreview(model = buildEvidenceRequirementPreviewModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
