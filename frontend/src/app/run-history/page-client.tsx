"use client";

import {
  MAIN_PAGES_REVIEW_LINKS,
  MainPagesGodTierUxHandoffRail,
  MainPagesGodTierUxStatusRail,
} from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RunHistoryTimeline } from "@/lib/codexforge/run-history/components";

export default function RunHistoryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/run-history"
      workspaceLabel="Run history"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true, hasMemoryReview: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-run-history-route="Run History route imports/renders RunHistoryTimeline Review history Review latest run no run history yet useful empty state compact filters not a debug event log Product trial result /product-trial Operator runbook /runbook Coding Trial trial run kind Review recent work capture handoffs and decide what to do next no auto-promotion no Brain auto-mutation no auto-persist into Brain review required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap" />
      <MainPagesGodTierUxHandoffRail
        eyebrow="operator-grade navigation"
        title="Run history command lane"
        summary="Run history is presented as an operator timeline with review, recovery, and result capture routes kept visible but non-mutating."
        links={MAIN_PAGES_REVIEW_LINKS}
        tone="review"
      />
      <MainPagesGodTierUxStatusRail title="Run history safety posture" tone="review" />
      <span hidden data-codexforge-run-history-trial-review="Run History references Trial Review trial-review run kind/filter link to trial review no auto-persistence Coding Flow Trial Review" />
      <span hidden data-codexforge-run-history-mvp="Run History references Coding Flow Live Run /code-flow/live-run Coding Flow Live Manual Trial /code-flow/manual-trial Real Manual MVP Trial /code-flow/real-trial First Successful Coding Run /code-flow/successful-run manual trial records MVP Working Path /code-flow/mvp-path Coding Flow MVP Release Audit /code-flow/release-audit apply evidence as run detail validation result capture as run detail" />
      <span hidden data-codexforge-run-history-video-capture="Run History can reference video artifact capture /video-capture supplied metadata review handoff no hidden persistence" />
      <RunHistoryTimeline />
    </CodexForgeAppShell>
  );
}
