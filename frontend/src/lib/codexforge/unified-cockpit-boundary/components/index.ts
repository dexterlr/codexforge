import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function UnifiedCockpitBoundaryPanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "unified-cockpit-boundary" });
}
