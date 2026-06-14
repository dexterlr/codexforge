"use client";

import { DailyBetaOneControlledTrialHardeningPanel } from "@/lib/codexforge/daily-beta-1-controlled-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneControlledTrialHardeningPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-controlled-trial-hardening"
      workspaceLabel="DB1 Trial Hardening"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneControlledTrialHardeningPanel />
    </CodexForgeAppShell>
  );
}
