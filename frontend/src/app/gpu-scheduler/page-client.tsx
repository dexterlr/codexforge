"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalGpuJobSchedulerPreviewPanel } from "@/lib/codexforge/local-gpu-job-scheduler-preview/components";

export default function GpuSchedulerPageClient() {
  return (
    <CodexForgeAppShell activePath="/gpu-scheduler" workspaceLabel="GPU Scheduler" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalGpuJobSchedulerPreviewPanel />
    </CodexForgeAppShell>
  );
}
