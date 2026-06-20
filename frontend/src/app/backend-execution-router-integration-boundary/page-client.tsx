"use client";

import { BackendExecutionRouterIntegrationBoundaryPanel } from "@/lib/codexforge/backend-execution-router-integration-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendExecutionRouterIntegrationBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-execution-router-integration-boundary"
      workspaceLabel="Backend Execution Router Integration Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionRouterIntegrationBoundaryPanel />
    </CodexForgeAppShell>
  );
}
