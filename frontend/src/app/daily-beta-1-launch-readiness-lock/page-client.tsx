"use client";

import { DailyBetaOneLaunchReadinessLockPanel } from "@/lib/codexforge/daily-beta-1-launch-readiness-lock/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneLaunchReadinessLockPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-launch-readiness-lock"
      workspaceLabel="Daily Beta 1 Launch Readiness Lock"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneLaunchReadinessLockPanel />
    </CodexForgeAppShell>
  );
}
