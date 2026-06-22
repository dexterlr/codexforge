import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const UNIFIED_COCKPIT_BOUNDARY_LANGUAGE =
  "Unified cockpit boundary | Unified cockpit boundary does not execute commands or write files | Unified cockpit requires explicit operator approval before future execution | Cockpit unifies goal plan diff command approval execution evidence result and recovery | Phase pages are dev/test surfaces only | Unified cockpit boundary checklist";

export { buildUnifiedCockpitStableKey as buildUnifiedCockpitBoundaryStableKey };

export function buildUnifiedCockpitBoundaryModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("unified-cockpit-boundary");
}

export function summarizeUnifiedCockpitBoundary(model = buildUnifiedCockpitBoundaryModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
