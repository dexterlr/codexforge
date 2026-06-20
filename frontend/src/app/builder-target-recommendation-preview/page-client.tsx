"use client";

import { BuilderTargetRecommendationPreviewPanel } from "@/lib/codexforge/builder-target-recommendation-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuilderTargetRecommendationPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/builder-target-recommendation-preview"
      workspaceLabel="Builder Target Recommendation Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuilderTargetRecommendationPreviewPanel />
    </CodexForgeAppShell>
  );
}
