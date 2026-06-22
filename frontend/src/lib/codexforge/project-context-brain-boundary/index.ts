import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const PROJECT_CONTEXT_BRAIN_BOUNDARY_LANGUAGE =
  "Project context brain boundary | Project context brain boundary does not crawl arbitrary files from the UI | Project context brain requires explicit operator approval for backend-owned inspection | Project context brain prepares local project understanding without broad execution | Denied project context paths remain blocked | Project context brain checklist | Go to Project Context Brain Boundary";

export function buildProjectContextBrainBoundaryModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("project-context-brain-boundary");
}

export function summarizeProjectContextBrainBoundary(
  model = buildProjectContextBrainBoundaryModel()
): string {
  return summarizeProjectContextBrainRouteModel(model);
}
