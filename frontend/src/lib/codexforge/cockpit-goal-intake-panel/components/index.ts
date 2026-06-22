import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitGoalIntakePanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-goal-intake-panel" });
}
