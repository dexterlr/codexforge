import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitMvpEmptyStatePanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-mvp-empty-state" });
}
