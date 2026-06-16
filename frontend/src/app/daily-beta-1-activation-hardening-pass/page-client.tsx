"use client";

import { DailyBetaOneActivationHardeningPassPanel } from "@/lib/codexforge/daily-beta-1-activation-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneActivationHardeningPassPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-activation-hardening-pass"
      workspaceLabel="Daily Beta 1 Activation Hardening Pass"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneActivationHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
