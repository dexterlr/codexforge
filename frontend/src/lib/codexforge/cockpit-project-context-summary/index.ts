import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const COCKPIT_PROJECT_CONTEXT_SUMMARY_LANGUAGE =
  "Cockpit project context summary | Cockpit project context summary keeps the cockpit as the normal user surface | Cockpit project context summary does not broaden execution | Cockpit project context summary shows project stack files commands risks evidence result recovery and confidence | Phase pages remain dev test diagnostics only | Cockpit project context checklist | Go to Cockpit Project Context Summary";

export function buildCockpitProjectContextSummaryModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("cockpit-project-context-summary");
}

export function summarizeCockpitProjectContextSummary(
  model = buildCockpitProjectContextSummaryModel()
): string {
  return summarizeProjectContextBrainRouteModel(model);
}
