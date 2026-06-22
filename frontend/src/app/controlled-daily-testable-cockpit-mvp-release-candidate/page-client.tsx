"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledDailyTestableCockpitMvpReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/controlled-daily-testable-cockpit-mvp-release-candidate" workspaceLabel="Controlled Daily-Testable Cockpit MVP Release Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="controlled-daily-testable-cockpit-mvp-release-candidate" />
    </CodexForgeAppShell>
  );
}
