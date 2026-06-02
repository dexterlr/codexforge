"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { VideoExportHandoffPanel } from "@/lib/codexforge/video-export-handoff/components";

export default function VideoExportPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-export" workspaceLabel="Video Export" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <VideoExportHandoffPanel />
    </CodexForgeAppShell>
  );
}
