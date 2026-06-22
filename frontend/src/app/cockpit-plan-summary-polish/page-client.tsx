"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitPlanSummaryPolishPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-plan-summary-polish" workspaceLabel="Cockpit Plan Summary Polish" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="cockpit-plan-summary-polish" />
    </CodexForgeAppShell>
  );
}
