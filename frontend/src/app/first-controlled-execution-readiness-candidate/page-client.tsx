"use client";

import { ControlledExecutionReadinessGateRoutePanel } from "@/lib/codexforge/controlled-execution-readiness-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstControlledExecutionReadinessCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/first-controlled-execution-readiness-candidate" workspaceLabel="First Controlled Execution Readiness Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ControlledExecutionReadinessGateRoutePanel routeSlug="first-controlled-execution-readiness-candidate" />
    </CodexForgeAppShell>
  );
}
