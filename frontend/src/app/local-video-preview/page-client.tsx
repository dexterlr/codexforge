"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalVideoPreviewPlayerPanel } from "@/lib/codexforge/local-video-preview-player/components";

export default function LocalVideoPreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/local-video-preview" workspaceLabel="Video Preview" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalVideoPreviewPlayerPanel />
    </CodexForgeAppShell>
  );
}
