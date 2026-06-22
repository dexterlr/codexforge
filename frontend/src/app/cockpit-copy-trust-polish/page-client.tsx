"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitCopyTrustPolishPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-copy-trust-polish" workspaceLabel="Cockpit Copy Trust Polish" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="cockpit-copy-trust-polish" />
    </CodexForgeAppShell>
  );
}
