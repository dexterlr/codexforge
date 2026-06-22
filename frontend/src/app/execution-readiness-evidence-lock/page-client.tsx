"use client";

import { ControlledExecutionReadinessGateRoutePanel } from "@/lib/codexforge/controlled-execution-readiness-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExecutionReadinessEvidenceLockPageClient() {
  return (
    <CodexForgeAppShell activePath="/execution-readiness-evidence-lock" workspaceLabel="Execution Readiness Evidence Lock" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ControlledExecutionReadinessGateRoutePanel routeSlug="execution-readiness-evidence-lock" />
    </CodexForgeAppShell>
  );
}
