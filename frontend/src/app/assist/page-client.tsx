"use client";
import {
  MAIN_PAGES_REVIEW_LINKS,
  MainPagesGodTierUxHandoffRail,
  MainPagesGodTierUxStatusRail,
} from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { AssistedCodingModePanel } from "@/lib/codexforge/assisted-coding-mode/components";

export default function AssistPageClient() {
  return <CodexForgeAppShell activePath="/assist" workspaceLabel="Assisted coding mode" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-assist-route="AssistedCodingModePanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority no goal selected helpful empty state recommends /first-task for new users" />
    <MainPagesGodTierUxHandoffRail
      eyebrow="premium command center"
      title="Assist workflow entry"
      summary="Assisted coding stays dense but readable: review the target, inspect recommendations, and move results into inbox or run history without automatic execution."
      links={MAIN_PAGES_REVIEW_LINKS}
      tone="workflow"
    />
    <MainPagesGodTierUxStatusRail title="Assisted coding guardrails" tone="workflow" />
    <AssistedCodingModePanel />
  </CodexForgeAppShell>;
}
