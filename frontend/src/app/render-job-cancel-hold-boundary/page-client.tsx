"use client";

import { RenderJobCancelHoldLiveBoundaryPanel } from "@/lib/codexforge/render-job-cancel-hold-live-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RenderJobCancelHoldBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/render-job-cancel-hold-boundary"
      workspaceLabel="Render Job Cancel Hold Boundary"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RenderJobCancelHoldLiveBoundaryPanel />
    </CodexForgeAppShell>
  );
}
