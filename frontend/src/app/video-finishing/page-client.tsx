"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { VideoFinishingPipelinePanel } from "@/lib/codexforge/video-finishing-pipeline/components";

export default function VideoFinishingPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-finishing" workspaceLabel="Video Finishing" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <VideoFinishingPipelinePanel />
    </CodexForgeAppShell>
  );
}
