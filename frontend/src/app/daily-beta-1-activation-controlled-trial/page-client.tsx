"use client";

import { DailyBetaOneActivationControlledTrialPanel } from "@/lib/codexforge/daily-beta-1-activation-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneActivationControlledTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-activation-controlled-trial"
      workspaceLabel="Daily Beta 1 Activation Controlled Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneActivationControlledTrialPanel />
    </CodexForgeAppShell>
  );
}
