"use client";

import { ControlledExecutionReadinessGateRoutePanel } from "@/lib/codexforge/controlled-execution-readiness-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExecutionReadinessGoNoGoSummaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/execution-readiness-go-no-go-summary" workspaceLabel="Execution Readiness Go No Go Summary" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ControlledExecutionReadinessGateRoutePanel routeSlug="execution-readiness-go-no-go-summary" />
    </CodexForgeAppShell>
  );
}
