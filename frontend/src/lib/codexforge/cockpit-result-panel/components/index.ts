import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitResultPanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-result-panel" });
}
