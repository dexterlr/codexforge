"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function QueuePreflightStatePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/queue-preflight-state-preview"
      workspaceLabel="Queue Preflight State Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="queue-preflight-state-preview" />
    </CodexForgeAppShell>
  );
}
