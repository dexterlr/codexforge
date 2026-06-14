"use client";

import { DailyBetaHardeningPassPanel } from "@/lib/codexforge/daily-beta-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaHardeningPassPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-hardening-pass"
      workspaceLabel="Daily Beta Hardening"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
