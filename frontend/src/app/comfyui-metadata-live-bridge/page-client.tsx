"use client";

import { ComfyUiMetadataLiveBridgePanel } from "@/lib/codexforge/comfyui-metadata-live-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ComfyUiMetadataLiveBridgePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/comfyui-metadata-live-bridge"
      workspaceLabel="ComfyUI Metadata Bridge"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ComfyUiMetadataLiveBridgePanel />
    </CodexForgeAppShell>
  );
}
