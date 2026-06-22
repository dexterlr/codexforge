"use client";

import { ControlledExecutionReadinessGateRoutePanel } from "@/lib/codexforge/controlled-execution-readiness-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExecutionReadinessDeniedPathMatrixPageClient() {
  return (
    <CodexForgeAppShell activePath="/execution-readiness-denied-path-matrix" workspaceLabel="Execution Readiness Denied Path Matrix" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ControlledExecutionReadinessGateRoutePanel routeSlug="execution-readiness-denied-path-matrix" />
    </CodexForgeAppShell>
  );
}
