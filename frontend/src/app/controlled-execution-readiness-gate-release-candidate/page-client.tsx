"use client";

import { ControlledExecutionReadinessGateRoutePanel } from "@/lib/codexforge/controlled-execution-readiness-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledExecutionReadinessGateReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/controlled-execution-readiness-gate-release-candidate" workspaceLabel="Controlled Execution Readiness Gate Release Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ControlledExecutionReadinessGateRoutePanel routeSlug="controlled-execution-readiness-gate-release-candidate" />
    </CodexForgeAppShell>
  );
}
