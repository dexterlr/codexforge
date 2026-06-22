import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const PROJECT_MAP_PREVIEW_LANGUAGE =
  "Project map preview | Project map preview does not browse arbitrary files from the UI | Project map preview requires explicit operator approval for backend-owned inspection | Project map previews app folders source folders config folders scripts docs tests and diagnostics without live UI crawling | Denied project map paths remain blocked | Project map checklist | Go to Project Map Preview";

export function buildProjectMapPreviewModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("project-map-preview");
}

export function summarizeProjectMapPreview(model = buildProjectMapPreviewModel()): string {
  return summarizeProjectContextBrainRouteModel(model);
}
