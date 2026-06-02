"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RenderJobStatusPollingPanel } from "@/lib/codexforge/render-job-status-polling/components";

export default function RenderJobStatusPageClient() {
  return (
    <CodexForgeAppShell activePath="/render-job-status" workspaceLabel="Render Job Status" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RenderJobStatusPollingPanel />
    </CodexForgeAppShell>
  );
}
