"use client";

import { RenderJobStatusPollingLiveBridgePanel } from "@/lib/codexforge/render-job-status-polling-live-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RenderJobStatusPollingPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/render-job-status-polling"
      workspaceLabel="Render Job Status Polling"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RenderJobStatusPollingLiveBridgePanel />
    </CodexForgeAppShell>
  );
}
