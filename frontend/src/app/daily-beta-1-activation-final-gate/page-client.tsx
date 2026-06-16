"use client";

import { DailyBetaOneActivationFinalGatePanel } from "@/lib/codexforge/daily-beta-1-activation-final-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneActivationFinalGatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-activation-final-gate"
      workspaceLabel="Daily Beta 1 Activation Final Gate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneActivationFinalGatePanel />
    </CodexForgeAppShell>
  );
}
