import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_MVP_EMPTY_STATE_LANGUAGE =
  "Cockpit MVP empty state | Cockpit MVP empty state does not call models or run commands | MVP empty state requires explicit operator approval before future execution | Empty state guides the operator to enter a goal and review plan before action | Denied cockpit empty state paths remain blocked | Cockpit MVP empty state checklist";

export { buildUnifiedCockpitStableKey as buildCockpitMvpEmptyStateStableKey };

export function buildCockpitMvpEmptyStateModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-mvp-empty-state");
}

export function summarizeCockpitMvpEmptyState(model = buildCockpitMvpEmptyStateModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
