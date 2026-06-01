"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { AssistedCodingModePanel } from "@/lib/codexforge/assisted-coding-mode/components";

export default function AssistPageClient() {
  return <CodexForgeAppShell activePath="/assist" workspaceLabel="Assisted coding mode" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-assist-route="AssistedCodingModePanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <AssistedCodingModePanel />
  </CodexForgeAppShell>;
}
