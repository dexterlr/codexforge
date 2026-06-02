"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalDraftToFinalRenderPipelinePanel } from "@/lib/codexforge/local-draft-to-final-render-pipeline/components";

export default function VideoFinalRenderPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-final-render" workspaceLabel="Draft to Final" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalDraftToFinalRenderPipelinePanel />
    </CodexForgeAppShell>
  );
}
