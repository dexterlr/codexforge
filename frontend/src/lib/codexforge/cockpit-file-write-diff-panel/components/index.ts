import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitFileWriteDiffPanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-file-write-diff-panel" });
}
