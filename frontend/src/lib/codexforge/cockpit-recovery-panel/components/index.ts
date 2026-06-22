import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitRecoveryPanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-recovery-panel" });
}
