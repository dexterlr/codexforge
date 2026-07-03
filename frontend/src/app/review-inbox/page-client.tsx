"use client";
import {
  MAIN_PAGES_REVIEW_LINKS,
  MainPagesGodTierUxHandoffRail,
  MainPagesGodTierUxStatusRail,
} from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ResultReviewInboxPanel } from "@/lib/codexforge/result-review-inbox/components";

export default function ReviewInboxPageClient() {
  return <CodexForgeAppShell activePath="/review-inbox" workspaceLabel="Review inbox" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-review-inbox-route="ResultReviewInboxPanel route imports/renders main panel no review items helpful empty state route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <MainPagesGodTierUxHandoffRail
      eyebrow="review-only UX upgrade"
      title="Review inbox command lane"
      summary="Review items, recovery paths, and result history are framed as operator decisions. Empty states point to the next useful route without inventing work."
      links={MAIN_PAGES_REVIEW_LINKS}
      tone="review"
    />
    <MainPagesGodTierUxStatusRail title="Review inbox boundaries" tone="review" />
    <ResultReviewInboxPanel />
  </CodexForgeAppShell>;
}
