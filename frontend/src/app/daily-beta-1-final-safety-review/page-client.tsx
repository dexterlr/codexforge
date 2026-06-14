"use client";

import { DailyBetaOneFinalSafetyReviewPanel } from "@/lib/codexforge/daily-beta-1-final-safety-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneFinalSafetyReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-final-safety-review"
      workspaceLabel="Daily Beta 1 Safety"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneFinalSafetyReviewPanel />
    </CodexForgeAppShell>
  );
}
