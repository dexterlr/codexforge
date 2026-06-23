"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function QueueResultCaptureStatePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/queue-result-capture-state-preview"
      workspaceLabel="Queue Result Capture State Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="queue-result-capture-state-preview" />
    </CodexForgeAppShell>
  );
}
