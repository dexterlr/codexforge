import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function FirstUnifiedCockpitCandidatePanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "first-unified-cockpit-candidate" });
}
