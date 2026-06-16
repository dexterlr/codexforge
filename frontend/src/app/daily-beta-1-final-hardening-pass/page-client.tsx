"use client";

import { DailyBetaOneFinalHardeningPassPanel } from "@/lib/codexforge/daily-beta-1-final-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneFinalHardeningPassPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-final-hardening-pass"
      workspaceLabel="Final Hardening Pass"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneFinalHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
