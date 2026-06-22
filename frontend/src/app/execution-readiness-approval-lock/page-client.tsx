"use client";

import { ControlledExecutionReadinessGateRoutePanel } from "@/lib/codexforge/controlled-execution-readiness-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExecutionReadinessApprovalLockPageClient() {
  return (
    <CodexForgeAppShell activePath="/execution-readiness-approval-lock" workspaceLabel="Execution Readiness Approval Lock" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ControlledExecutionReadinessGateRoutePanel routeSlug="execution-readiness-approval-lock" />
    </CodexForgeAppShell>
  );
}
