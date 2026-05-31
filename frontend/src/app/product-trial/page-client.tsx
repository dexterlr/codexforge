"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ManualProductTrialPanel } from "@/lib/codexforge/manual-product-trial/components";
export default function PageClient() {
  return <CodexForgeAppShell activePath="/product-trial" workspaceLabel="Manual product trial" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-route="ManualProductTrialPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons" />
    <ManualProductTrialPanel />
  </CodexForgeAppShell>;
}
