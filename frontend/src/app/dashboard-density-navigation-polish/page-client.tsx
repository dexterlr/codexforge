"use client";

import { DashboardDensityNavigationPolishPanel } from "@/lib/codexforge/dashboard-density-navigation-polish/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DashboardDensityNavigationPolishPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dashboard-density-navigation-polish"
      workspaceLabel="Dashboard Polish"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DashboardDensityNavigationPolishPanel />
    </CodexForgeAppShell>
  );
}
