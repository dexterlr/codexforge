"use client";

import { DailyBetaActivationRegressionReviewPanel } from "@/lib/codexforge/daily-beta-activation-regression-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationRegressionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-regression-review"
      workspaceLabel="Activation Regression"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationRegressionReviewPanel />
    </CodexForgeAppShell>
  );
}
