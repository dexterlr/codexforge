"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function QueueAuditCaptureStatePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/queue-audit-capture-state-preview"
      workspaceLabel="Queue Audit Capture State Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="queue-audit-capture-state-preview" />
    </CodexForgeAppShell>
  );
}
