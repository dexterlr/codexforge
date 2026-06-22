"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitAuditTimelinePolishPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-audit-timeline-polish" workspaceLabel="Cockpit Audit Timeline Polish" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="cockpit-audit-timeline-polish" />
    </CodexForgeAppShell>
  );
}
