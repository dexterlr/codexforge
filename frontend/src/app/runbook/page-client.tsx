"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { OperatorRunbookPanel } from "@/lib/codexforge/operator-runbook/components";
export default function PageClient() {
  return <CodexForgeAppShell activePath="/runbook" workspaceLabel="Operator runbook" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-route="OperatorRunbookPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons" />
    <OperatorRunbookPanel />
  </CodexForgeAppShell>;
}
