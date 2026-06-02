"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RenderJobControlBoundaryPanel } from "@/lib/codexforge/render-job-control-boundary/components";

export default function RenderJobControlBoundaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/render-job-control-boundary" workspaceLabel="Hold or Cancel" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RenderJobControlBoundaryPanel />
    </CodexForgeAppShell>
  );
}
