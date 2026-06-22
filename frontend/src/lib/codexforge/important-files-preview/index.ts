import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const IMPORTANT_FILES_PREVIEW_LANGUAGE =
  "Important files preview | Important files preview does not open arbitrary files from the UI | Important files preview requires explicit operator approval | Important files preview highlights package config routes cockpit modules smoke scripts checkpoint docs and safety files | Denied important file paths remain blocked | Important files checklist | Go to Important Files Preview";

export function buildImportantFilesPreviewModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("important-files-preview");
}

export function summarizeImportantFilesPreview(model = buildImportantFilesPreviewModel()): string {
  return summarizeProjectContextBrainRouteModel(model);
}
