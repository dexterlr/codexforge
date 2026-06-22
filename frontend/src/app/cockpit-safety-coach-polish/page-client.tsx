"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitSafetyCoachPolishPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-safety-coach-polish" workspaceLabel="Cockpit Safety Coach Polish" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="cockpit-safety-coach-polish" />
    </CodexForgeAppShell>
  );
}
