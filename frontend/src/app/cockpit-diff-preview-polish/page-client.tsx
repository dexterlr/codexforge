"use client";

import { DailyTestableCockpitMvpRoutePanel } from "@/lib/codexforge/daily-testable-cockpit-mvp/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitDiffPreviewPolishPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-diff-preview-polish" workspaceLabel="Cockpit Diff Preview Polish" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DailyTestableCockpitMvpRoutePanel routeSlug="cockpit-diff-preview-polish" />
    </CodexForgeAppShell>
  );
}
