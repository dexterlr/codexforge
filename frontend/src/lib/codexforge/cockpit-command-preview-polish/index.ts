import {
  buildDailyTestableCockpitMvpRouteModel,
  summarizeDailyTestableCockpitMvpRouteModel,
  type DailyTestableCockpitMvpRouteModel,
} from "../daily-testable-cockpit-mvp";

export const COCKPIT_COMMAND_PREVIEW_POLISH_LANGUAGE =
  "Cockpit command preview polish | Cockpit command preview polish does not run commands | Cockpit command preview polish requires explicit operator approval | Command preview shows allowlist status arguments working directory timeout stdout stderr and evidence expectations | No direct command execution from the command preview | Cockpit command preview checklist | Go to Cockpit Command Preview Polish";

export function buildCockpitCommandPreviewPolishModel(): DailyTestableCockpitMvpRouteModel {
  return buildDailyTestableCockpitMvpRouteModel("cockpit-command-preview-polish");
}

export function summarizeCockpitCommandPreviewPolish(model = buildCockpitCommandPreviewPolishModel()): string {
  return summarizeDailyTestableCockpitMvpRouteModel(model);
}
