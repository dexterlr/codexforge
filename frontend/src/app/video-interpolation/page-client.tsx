"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { FrameInterpolationWorkflowPlannerPanel } from "@/lib/codexforge/frame-interpolation-workflow-planner/components";

export default function VideoInterpolationPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-interpolation" workspaceLabel="Video Interpolation" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FrameInterpolationWorkflowPlannerPanel />
    </CodexForgeAppShell>
  );
}
