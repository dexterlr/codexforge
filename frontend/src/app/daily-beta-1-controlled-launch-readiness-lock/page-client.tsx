"use client";

import { DailyBetaOneControlledLaunchReadinessLockPanel } from "@/lib/codexforge/daily-beta-1-controlled-launch-readiness-lock/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneControlledLaunchReadinessLockPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-controlled-launch-readiness-lock"
      workspaceLabel="Daily Beta 1 Controlled Launch Readiness Lock"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneControlledLaunchReadinessLockPanel />
    </CodexForgeAppShell>
  );
}
