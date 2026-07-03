"use client";

import {
  MAIN_PAGES_REVIEW_LINKS,
  MainPagesGodTierUxHandoffRail,
} from "@/lib/codexforge/main-pages-god-tier-ux";
import { ResultHistoryConsolidationPanel } from "@/lib/codexforge/result-history-consolidation/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultHistoryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-history"
      workspaceLabel="Result History"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <MainPagesGodTierUxHandoffRail
        eyebrow="review-only UX upgrade"
        title="Result history command lane"
        summary="Consolidated result history keeps cross-workflow decisions inspectable without creating exports, persistence, or automatic promotion."
        links={MAIN_PAGES_REVIEW_LINKS}
        tone="review"
      />
      <ResultHistoryConsolidationPanel />
    </CodexForgeAppShell>
  );
}
