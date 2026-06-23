"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendExecutionQueueBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-execution-queue-boundary"
      workspaceLabel="Backend Execution Queue Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="backend-execution-queue-boundary" />
    </CodexForgeAppShell>
  );
}
