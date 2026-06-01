"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { VideoPromptBuilderPanel } from "@/lib/codexforge/video-prompt-builder/components";

export default function VideoPromptPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-prompt" workspaceLabel="Video Prompt" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <VideoPromptBuilderPanel />
    </CodexForgeAppShell>
  );
}
