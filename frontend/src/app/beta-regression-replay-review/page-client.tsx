"use client";

import { BetaRegressionReplayReviewPanel } from "@/lib/codexforge/beta-regression-replay-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaRegressionReplayReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-regression-replay-review"
      workspaceLabel="Beta Regression Replay"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaRegressionReplayReviewPanel />
    </CodexForgeAppShell>
  );
}
