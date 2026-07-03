"use client";

import { GuardedVideoPipelineRail } from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { VideoProjectWorkspacePanel } from "@/lib/codexforge/video-project-workspace/components";

export default function VideoProjectsPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-projects" workspaceLabel="Video Projects" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuardedVideoPipelineRail title="Video project guarded pipeline" />
      <VideoProjectWorkspacePanel />
    </CodexForgeAppShell>
  );
}
