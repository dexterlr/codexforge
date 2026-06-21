"use client";

import { GuardedExecutionQueueBoundaryPanel } from "@/lib/codexforge/guarded-execution-queue-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedExecutionQueueBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-execution-queue-boundary"
      workspaceLabel="Guarded Execution Queue Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedExecutionQueueBoundaryPanel />
    </CodexForgeAppShell>
  );
}
