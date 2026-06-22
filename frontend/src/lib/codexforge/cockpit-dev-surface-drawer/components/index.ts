import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitDevSurfaceDrawerPanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-dev-surface-drawer" });
}
