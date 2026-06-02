"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalVideoArtifactCaptureMvpPanel } from "@/lib/codexforge/local-video-artifact-capture-mvp/components";

export default function VideoCapturePageClient() {
  return (
    <CodexForgeAppShell activePath="/video-capture" workspaceLabel="Video Capture" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalVideoArtifactCaptureMvpPanel />
    </CodexForgeAppShell>
  );
}
