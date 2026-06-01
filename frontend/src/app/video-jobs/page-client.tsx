"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { VideoJobQueuePreviewPanel } from "@/lib/codexforge/video-job-queue-preview/components";

export default function VideoJobsPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-jobs" workspaceLabel="Video Jobs" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <VideoJobQueuePreviewPanel />
    </CodexForgeAppShell>
  );
}
