"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalUpscaleWorkflowPlannerPanel } from "@/lib/codexforge/local-upscale-workflow-planner/components";

export default function VideoUpscalePageClient() {
  return (
    <CodexForgeAppShell activePath="/video-upscale" workspaceLabel="Video Upscale" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalUpscaleWorkflowPlannerPanel />
    </CodexForgeAppShell>
  );
}
