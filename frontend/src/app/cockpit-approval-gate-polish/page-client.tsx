"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitApprovalGatePolishPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-approval-gate-polish" workspaceLabel="Cockpit Approval Gate Polish" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="cockpit-approval-gate-polish" />
    </CodexForgeAppShell>
  );
}
