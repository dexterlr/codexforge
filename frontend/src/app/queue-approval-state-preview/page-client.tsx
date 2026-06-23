"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function QueueApprovalStatePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/queue-approval-state-preview"
      workspaceLabel="Queue Approval State Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="queue-approval-state-preview" />
    </CodexForgeAppShell>
  );
}
