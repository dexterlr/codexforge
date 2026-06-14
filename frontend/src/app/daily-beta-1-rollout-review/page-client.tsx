"use client";

import { DailyBetaOneRolloutReviewPanel } from "@/lib/codexforge/daily-beta-1-rollout-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneRolloutReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-rollout-review"
      workspaceLabel="Daily Beta 1 Rollout Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneRolloutReviewPanel />
    </CodexForgeAppShell>
  );
}
