"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitDevDiagnosticsDrawerPolishPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-dev-diagnostics-drawer-polish" workspaceLabel="Cockpit Dev Diagnostics Drawer Polish" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="cockpit-dev-diagnostics-drawer-polish" />
    </CodexForgeAppShell>
  );
}
