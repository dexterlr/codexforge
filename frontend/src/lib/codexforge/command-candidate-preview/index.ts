import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const COMMAND_CANDIDATE_PREVIEW_LANGUAGE =
  "Command candidate preview | Command candidate preview does not run commands | Command candidate preview requires explicit operator approval | Command candidate preview lists likely build smoke validation and hygiene commands as review-only candidates | Denied command candidate paths remain blocked | Command candidate checklist | Go to Command Candidate Preview";

export function buildCommandCandidatePreviewModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("command-candidate-preview");
}

export function summarizeCommandCandidatePreview(model = buildCommandCandidatePreviewModel()): string {
  return summarizeProjectContextBrainRouteModel(model);
}
