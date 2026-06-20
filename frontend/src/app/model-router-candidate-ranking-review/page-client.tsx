"use client";

import { ModelRouterCandidateRankingReviewPanel } from "@/lib/codexforge/model-router-candidate-ranking-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterCandidateRankingReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-candidate-ranking-review"
      workspaceLabel="Model Router Candidate Ranking Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterCandidateRankingReviewPanel />
    </CodexForgeAppShell>
  );
}
