"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function QueueItemModelPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/queue-item-model-preview"
      workspaceLabel="Queue Item Model Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="queue-item-model-preview" />
    </CodexForgeAppShell>
  );
}
