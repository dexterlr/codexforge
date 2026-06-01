"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalVideoArtifactGalleryPanel } from "@/lib/codexforge/local-video-artifact-gallery/components";

export default function VideoArtifactsPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-artifacts" workspaceLabel="Video Artifacts" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalVideoArtifactGalleryPanel />
    </CodexForgeAppShell>
  );
}
