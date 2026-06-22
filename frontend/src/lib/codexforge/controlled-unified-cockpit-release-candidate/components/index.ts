import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function ControlledUnifiedCockpitReleaseCandidatePanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "controlled-unified-cockpit-release-candidate" });
}
