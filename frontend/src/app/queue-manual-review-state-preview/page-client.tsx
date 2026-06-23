"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function QueueManualReviewStatePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/queue-manual-review-state-preview"
      workspaceLabel="Queue Manual Review State Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="queue-manual-review-state-preview" />
    </CodexForgeAppShell>
  );
}
