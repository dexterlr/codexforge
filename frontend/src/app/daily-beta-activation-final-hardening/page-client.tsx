"use client";

import { DailyBetaActivationFinalHardeningPanel } from "@/lib/codexforge/daily-beta-activation-final-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationFinalHardeningPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-final-hardening"
      workspaceLabel="Activation Hardening"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationFinalHardeningPanel />
    </CodexForgeAppShell>
  );
}
