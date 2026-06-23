"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function QueueFailedCanceledStatePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/queue-failed-canceled-state-preview"
      workspaceLabel="Queue Failed Canceled State Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="queue-failed-canceled-state-preview" />
    </CodexForgeAppShell>
  );
}
