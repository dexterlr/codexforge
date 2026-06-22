import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitSinglePageNavigationContractPanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-single-page-navigation-contract" });
}
