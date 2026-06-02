"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ComfyUiMetadataProbePanel } from "@/lib/codexforge/comfyui-metadata-probe/components";

export default function ComfyUiMetadataPageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-metadata" workspaceLabel="ComfyUI Metadata" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ComfyUiMetadataProbePanel />
    </CodexForgeAppShell>
  );
}
