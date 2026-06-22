import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_DEV_SURFACE_DRAWER_LANGUAGE =
  "Cockpit dev surface drawer | Cockpit dev surface drawer does not execute phase pages | Dev surface drawer requires explicit operator intent to browse dev/test routes | Dev surface drawer labels phase pages as dev/test surfaces only | Normal users should use the cockpit instead of phase pages | Cockpit dev surface drawer checklist";

export { buildUnifiedCockpitStableKey as buildCockpitDevSurfaceDrawerStableKey };

export function buildCockpitDevSurfaceDrawerModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-dev-surface-drawer");
}

export function summarizeCockpitDevSurfaceDrawer(model = buildCockpitDevSurfaceDrawerModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
