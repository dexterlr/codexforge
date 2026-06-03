"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RouterAutoRecommendationReviewPanel } from "@/lib/codexforge/router-auto-recommendation-review/components";

export default function RouterRecommendationReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/router-recommendation-review"
      workspaceLabel="Router Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RouterAutoRecommendationReviewPanel />
    </CodexForgeAppShell>
  );
}
