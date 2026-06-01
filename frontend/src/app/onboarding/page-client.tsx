"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { MvpOnboardingPanel } from "@/lib/codexforge/mvp-onboarding/components";

export default function OnboardingPageClient() {
  return <CodexForgeAppShell activePath="/onboarding" workspaceLabel="Start with CodexForge" nextActionContext={{ wantsOperatorOverview: true, hasRegressionOrFixWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-onboarding-route="MvpOnboardingPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <MvpOnboardingPanel />
  </CodexForgeAppShell>;
}
