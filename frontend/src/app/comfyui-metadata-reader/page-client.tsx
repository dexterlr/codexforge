"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RealLocalComfyUiMetadataReaderPanel } from "@/lib/codexforge/real-local-comfyui-metadata-reader/components";

export default function ComfyUiMetadataReaderPageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-metadata-reader" workspaceLabel="ComfyUI Metadata Reader" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RealLocalComfyUiMetadataReaderPanel />
    </CodexForgeAppShell>
  );
}
