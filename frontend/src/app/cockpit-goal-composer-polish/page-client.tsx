"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitGoalComposerPolishPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-goal-composer-polish" workspaceLabel="Cockpit Goal Composer Polish" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="cockpit-goal-composer-polish" />
    </CodexForgeAppShell>
  );
}
