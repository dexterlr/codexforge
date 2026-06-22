"use client";

import { ControlledExecutionReadinessGateRoutePanel } from "@/lib/codexforge/controlled-execution-readiness-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExecutionReadinessAuditLockPageClient() {
  return (
    <CodexForgeAppShell activePath="/execution-readiness-audit-lock" workspaceLabel="Execution Readiness Audit Lock" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ControlledExecutionReadinessGateRoutePanel routeSlug="execution-readiness-audit-lock" />
    </CodexForgeAppShell>
  );
}
