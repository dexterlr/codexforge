import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const RECOVERY_IMPLICATION_PREVIEW_LANGUAGE =
  "Recovery implication preview | Recovery implication preview does not execute recovery | Recovery implication preview requires explicit operator approval | Recovery implication preview explains rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery implications | Denied recovery implication paths remain blocked | Recovery implication checklist | Go to Recovery Implication Preview";

export function buildRecoveryImplicationPreviewModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("recovery-implication-preview");
}

export function summarizeRecoveryImplicationPreview(
  model = buildRecoveryImplicationPreviewModel()
): string {
  return summarizeProjectContextBrainRouteModel(model);
}
