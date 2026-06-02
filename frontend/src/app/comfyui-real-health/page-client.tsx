"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RealLocalComfyUiHealthProbePanel } from "@/lib/codexforge/real-local-comfyui-health-probe/components";

export default function ComfyUiRealHealthPageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-real-health" workspaceLabel="Real ComfyUI Health" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealLocalComfyUiHealthProbePanel />
    </CodexForgeAppShell>
  );
}
