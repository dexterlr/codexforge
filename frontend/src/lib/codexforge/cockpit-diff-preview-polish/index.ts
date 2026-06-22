import {
  buildDailyTestableCockpitMvpRouteModel,
  summarizeDailyTestableCockpitMvpRouteModel,
  type DailyTestableCockpitMvpRouteModel,
} from "../daily-testable-cockpit-mvp";

export const COCKPIT_DIFF_PREVIEW_POLISH_LANGUAGE =
  "Cockpit diff preview polish | Cockpit diff preview polish does not write files or apply diffs | Cockpit diff preview polish requires explicit operator approval | Diff preview shows proposed file changes path guard status rollback readiness and denied paths | No direct file mutation from the diff preview | Cockpit diff preview checklist | Go to Cockpit Diff Preview Polish";

export function buildCockpitDiffPreviewPolishModel(): DailyTestableCockpitMvpRouteModel {
  return buildDailyTestableCockpitMvpRouteModel("cockpit-diff-preview-polish");
}

export function summarizeCockpitDiffPreviewPolish(model = buildCockpitDiffPreviewPolishModel()): string {
  return summarizeDailyTestableCockpitMvpRouteModel(model);
}
