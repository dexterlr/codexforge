"use client";

import { GameResultReviewPlanPanel } from "@/lib/codexforge/game-result-review-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameResultReviewPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-result-review-plan"
      workspaceLabel="Game Result Review Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameResultReviewPlanPanel />
    </CodexForgeAppShell>
  );
}