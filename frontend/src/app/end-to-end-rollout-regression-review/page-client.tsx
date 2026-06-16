"use client";

import { EndToEndRolloutRegressionReviewPanel } from "@/lib/codexforge/end-to-end-rollout-regression-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EndToEndRolloutRegressionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/end-to-end-rollout-regression-review"
      workspaceLabel="E2E Regression"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EndToEndRolloutRegressionReviewPanel />
    </CodexForgeAppShell>
  );
}
