"use client";

import { ComfyUiHealthProbeLiveBridgePanel } from "@/lib/codexforge/comfyui-health-probe-live-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ComfyUiHealthLiveBridgePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/comfyui-health-live-bridge"
      workspaceLabel="ComfyUI Health Bridge"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ComfyUiHealthProbeLiveBridgePanel />
    </CodexForgeAppShell>
  );
}
