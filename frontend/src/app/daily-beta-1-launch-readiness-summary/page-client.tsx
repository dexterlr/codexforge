"use client";

import { DailyBetaOneLaunchReadinessSummaryPanel } from "@/lib/codexforge/daily-beta-1-launch-readiness-summary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneLaunchReadinessSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-launch-readiness-summary"
      workspaceLabel="Daily Beta 1 Launch Readiness Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneLaunchReadinessSummaryPanel />
    </CodexForgeAppShell>
  );
}
