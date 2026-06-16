"use client";

import { DailyBetaActivationFinalGatePanel } from "@/lib/codexforge/daily-beta-activation-final-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationFinalGatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-final-gate"
      workspaceLabel="Activation Final Gate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationFinalGatePanel />
    </CodexForgeAppShell>
  );
}
