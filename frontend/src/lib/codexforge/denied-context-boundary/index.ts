import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const DENIED_CONTEXT_BOUNDARY_LANGUAGE =
  "Denied context boundary | Denied context boundary does not mutate workflow state | Denied context boundary requires explicit operator approval | Denied context boundary blocks arbitrary browsing secrets environment values provider calls connectors model calls commands writes installs deploys ports runtimes persistence and automatic memory promotion | Denied context paths remain blocked | Denied context checklist | Go to Denied Context Boundary";

export function buildDeniedContextBoundaryModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("denied-context-boundary");
}

export function summarizeDeniedContextBoundary(model = buildDeniedContextBoundaryModel()): string {
  return summarizeProjectContextBrainRouteModel(model);
}
