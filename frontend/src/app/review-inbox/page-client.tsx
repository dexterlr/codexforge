"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ResultReviewInboxPanel } from "@/lib/codexforge/result-review-inbox/components";

export default function ReviewInboxPageClient() {
  return <CodexForgeAppShell activePath="/review-inbox" workspaceLabel="Review inbox" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-review-inbox-route="ResultReviewInboxPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <ResultReviewInboxPanel />
  </CodexForgeAppShell>;
}
