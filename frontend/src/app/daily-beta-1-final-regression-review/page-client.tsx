"use client";

import { DailyBetaOneFinalRegressionReviewPanel } from "@/lib/codexforge/daily-beta-1-final-regression-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneFinalRegressionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-final-regression-review"
      workspaceLabel="Final Regression Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneFinalRegressionReviewPanel />
    </CodexForgeAppShell>
  );
}
