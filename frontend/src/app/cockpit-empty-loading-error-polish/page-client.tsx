"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitEmptyLoadingErrorPolishPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-empty-loading-error-polish" workspaceLabel="Cockpit Empty Loading Error Polish" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="cockpit-empty-loading-error-polish" />
    </CodexForgeAppShell>
  );
}
