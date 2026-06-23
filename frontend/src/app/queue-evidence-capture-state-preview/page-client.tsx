"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function QueueEvidenceCaptureStatePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/queue-evidence-capture-state-preview"
      workspaceLabel="Queue Evidence Capture State Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="queue-evidence-capture-state-preview" />
    </CodexForgeAppShell>
  );
}
