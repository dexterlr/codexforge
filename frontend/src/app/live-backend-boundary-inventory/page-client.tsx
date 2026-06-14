"use client";

import { LiveBackendBoundaryInventoryPanel } from "@/lib/codexforge/live-backend-boundary-inventory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LiveBackendBoundaryInventoryPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/live-backend-boundary-inventory"
      workspaceLabel="Backend Boundaries"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LiveBackendBoundaryInventoryPanel />
    </CodexForgeAppShell>
  );
}
