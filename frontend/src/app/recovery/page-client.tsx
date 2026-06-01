"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { GuidedRecoveryFlowPanel } from "@/lib/codexforge/guided-recovery-flow/components";

export default function RecoveryPageClient() {
  return <CodexForgeAppShell activePath="/recovery" workspaceLabel="Recovery flow" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-recovery-route="GuidedRecoveryFlowPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-apply no auto-run approval required preserve latest-message authority" />
    <GuidedRecoveryFlowPanel />
  </CodexForgeAppShell>;
}
