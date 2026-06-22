"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstDailyTestableCockpitMvpCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/first-daily-testable-cockpit-mvp-candidate" workspaceLabel="First Daily-Testable Cockpit MVP Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="first-daily-testable-cockpit-mvp-candidate" />
    </CodexForgeAppShell>
  );
}
