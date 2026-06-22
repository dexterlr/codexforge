import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitSafetyCoachPanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-safety-coach-panel" });
}
