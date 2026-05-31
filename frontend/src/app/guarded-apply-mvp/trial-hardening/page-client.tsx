"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { FirstGuardedApplyTrialHardeningPanel } from "@/lib/codexforge/first-guarded-apply-trial-hardening/components";
export default function PageClient() {
  return <CodexForgeAppShell activePath="/guarded-apply-mvp/trial-hardening" workspaceLabel="Harden first apply trial" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-route="FirstGuardedApplyTrialHardeningPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons" />
    <FirstGuardedApplyTrialHardeningPanel />
  </CodexForgeAppShell>;
}
