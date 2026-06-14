"use client";

import { DailyBetaOneHardeningPassPanel } from "@/lib/codexforge/daily-beta-1-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneHardeningPassPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-hardening-pass"
      workspaceLabel="Daily Beta 1 Hardening"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
