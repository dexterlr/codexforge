"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalRenderQueueControlsPanel } from "@/lib/codexforge/local-render-queue-controls/components";

export default function RenderQueuePageClient() {
  return (
    <CodexForgeAppShell activePath="/render-queue" workspaceLabel="Render Queue" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalRenderQueueControlsPanel />
    </CodexForgeAppShell>
  );
}
