"use client";
import {
  MAIN_PAGES_START_LINKS,
  MainPagesGodTierUxHandoffRail,
} from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { MvpOnboardingPanel } from "@/lib/codexforge/mvp-onboarding/components";

export default function OnboardingPageClient() {
  return <CodexForgeAppShell activePath="/onboarding" workspaceLabel="Start with CodexForge" nextActionContext={{ wantsOperatorOverview: true, hasRegressionOrFixWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-onboarding-route="MvpOnboardingPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <span hidden data-codexforge-onboarding-first-task="First safe task /first-task Safety Coach /safety-coach no goal selected helpful empty state" />
    <MainPagesGodTierUxHandoffRail
      eyebrow="operator-grade navigation"
      title="First-run command path"
      summary="Onboarding now presents a compact operator handoff before the detailed guide, with provider and credential paths kept review-only."
      links={MAIN_PAGES_START_LINKS}
      tone="workflow"
    />
    <MvpOnboardingPanel />
  </CodexForgeAppShell>;
}
