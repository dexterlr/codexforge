import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitEvidencePanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-evidence-panel" });
}
