"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyTestableCockpitBoundaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/daily-testable-cockpit-boundary" workspaceLabel="Daily-Testable Cockpit Boundary" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="daily-testable-cockpit-boundary" />
    </CodexForgeAppShell>
  );
}
