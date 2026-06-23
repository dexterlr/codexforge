"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function QueueBlockedDeniedStatePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/queue-blocked-denied-state-preview"
      workspaceLabel="Queue Blocked Denied State Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="queue-blocked-denied-state-preview" />
    </CodexForgeAppShell>
  );
}
