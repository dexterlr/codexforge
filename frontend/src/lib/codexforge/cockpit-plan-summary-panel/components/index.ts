import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitPlanSummaryPanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-plan-summary-panel" });
}
