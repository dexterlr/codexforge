"use client";

import { DailyBetaOneActivationRegressionReviewPanel } from "@/lib/codexforge/daily-beta-1-activation-regression-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneActivationRegressionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-activation-regression-review"
      workspaceLabel="Daily Beta 1 Activation Regression Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneActivationRegressionReviewPanel />
    </CodexForgeAppShell>
  );
}
