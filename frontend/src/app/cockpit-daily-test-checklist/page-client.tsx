"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitDailyTestChecklistPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-daily-test-checklist" workspaceLabel="Cockpit Daily Test Checklist" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="cockpit-daily-test-checklist" />
    </CodexForgeAppShell>
  );
}
