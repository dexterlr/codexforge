"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ComfyUiLiveHealthProbeGatePanel } from "@/lib/codexforge/comfyui-live-health-probe-gate/components";

export default function ComfyUiHealthGatePageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-health/gate" workspaceLabel="ComfyUI Health Gate" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ComfyUiLiveHealthProbeGatePanel />
    </CodexForgeAppShell>
  );
}
