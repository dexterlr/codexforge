"use client";

import { DailyBetaOneActivationReadinessLockPanel } from "@/lib/codexforge/daily-beta-1-activation-readiness-lock/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneActivationReadinessLockPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-activation-readiness-lock"
      workspaceLabel="Daily Beta 1 Activation Readiness Lock"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneActivationReadinessLockPanel />
    </CodexForgeAppShell>
  );
}
