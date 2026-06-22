"use client";

import { ControlledExecutionReadinessGateRoutePanel } from "@/lib/codexforge/controlled-execution-readiness-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledExecutionReadinessGateBoundaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/controlled-execution-readiness-gate-boundary" workspaceLabel="Controlled Execution Readiness Gate Boundary" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ControlledExecutionReadinessGateRoutePanel routeSlug="controlled-execution-readiness-gate-boundary" />
    </CodexForgeAppShell>
  );
}
