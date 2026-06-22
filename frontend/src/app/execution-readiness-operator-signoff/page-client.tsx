"use client";

import { ControlledExecutionReadinessGateRoutePanel } from "@/lib/codexforge/controlled-execution-readiness-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExecutionReadinessOperatorSignoffPageClient() {
  return (
    <CodexForgeAppShell activePath="/execution-readiness-operator-signoff" workspaceLabel="Execution Readiness Operator Signoff" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ControlledExecutionReadinessGateRoutePanel routeSlug="execution-readiness-operator-signoff" />
    </CodexForgeAppShell>
  );
}
