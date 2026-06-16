"use client";

import { DailyBetaActivationReadinessLockPanel } from "@/lib/codexforge/daily-beta-activation-readiness-lock/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationReadinessLockPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-readiness-lock"
      workspaceLabel="Activation Readiness Lock"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationReadinessLockPanel />
    </CodexForgeAppShell>
  );
}
