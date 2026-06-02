"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { DualGpuWorkerStrategyPanel } from "@/lib/codexforge/dual-gpu-worker-strategy/components";

export default function DualGpuPageClient() {
  return (
    <CodexForgeAppShell activePath="/dual-gpu" workspaceLabel="Dual-GPU" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <DualGpuWorkerStrategyPanel />
    </CodexForgeAppShell>
  );
}
