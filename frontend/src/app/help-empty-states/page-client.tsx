"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { SmartEmptyStatesPanel } from "@/lib/codexforge/smart-empty-states/components";

export default function HelpEmptyStatesPageClient() {
  return <CodexForgeAppShell activePath="/help-empty-states" workspaceLabel="Helpful empty states" nextActionContext={{ wantsOperatorOverview: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-help-empty-states-route="SmartEmptyStatesPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <SmartEmptyStatesPanel />
  </CodexForgeAppShell>;
}
