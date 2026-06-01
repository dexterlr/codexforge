"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { AssistedMvpQualitySweepPanel } from "@/lib/codexforge/assisted-mvp-quality-sweep/components";

export default function AssistedQualityPageClient() {
  return <CodexForgeAppShell activePath="/assisted-quality" workspaceLabel="Assisted MVP quality" nextActionContext={{ wantsOperatorOverview: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-assisted-quality-route="AssistedMvpQualitySweepPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <AssistedMvpQualitySweepPanel />
  </CodexForgeAppShell>;
}
