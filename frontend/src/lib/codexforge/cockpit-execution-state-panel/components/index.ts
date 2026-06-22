import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitExecutionStatePanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-execution-state-panel" });
}
