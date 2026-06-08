"use client";

import { RouterRecommendationApplyReviewPanel } from "@/lib/codexforge/router-recommendation-apply-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RouterRecommendationApplyReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/router-recommendation-apply-review"
      workspaceLabel="Router Apply Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RouterRecommendationApplyReviewPanel />
    </CodexForgeAppShell>
  );
}
