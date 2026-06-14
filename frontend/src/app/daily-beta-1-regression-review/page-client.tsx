"use client";

import { DailyBetaOneRegressionReviewPanel } from "@/lib/codexforge/daily-beta-1-regression-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneRegressionReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-regression-review"
      workspaceLabel="Daily Beta 1 Regression"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneRegressionReviewPanel />
    </CodexForgeAppShell>
  );
}
