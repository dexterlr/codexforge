"use client";

import { DailyBetaActivationHardeningPassPanel } from "@/lib/codexforge/daily-beta-activation-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationHardeningPassPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-hardening-pass"
      workspaceLabel="Activation Hardening"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
