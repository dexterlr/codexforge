"use client";

import { CockpitDevSurfaceDrawerPanel } from "@/lib/codexforge/cockpit-dev-surface-drawer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitDevSurfaceDrawerPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-dev-surface-drawer" workspaceLabel="Cockpit Dev Surface Drawer" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitDevSurfaceDrawerPanel />
    </CodexForgeAppShell>
  );
}
