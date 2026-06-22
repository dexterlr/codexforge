import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitCommandPreviewPanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-command-preview-panel" });
}
