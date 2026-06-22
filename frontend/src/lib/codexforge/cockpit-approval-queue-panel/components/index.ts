import { createElement } from "react";
import { UnifiedCockpitRoutePanel } from "../../unified-cockpit/components";

export function CockpitApprovalQueuePanel() {
  return createElement(UnifiedCockpitRoutePanel, { routeSlug: "cockpit-approval-queue-panel" });
}
