"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ComfyUiApprovedSubmitBoundaryPanel } from "@/lib/codexforge/comfyui-approved-submit-boundary/components";

export default function ComfyUiSubmitBoundaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-submit" workspaceLabel="ComfyUI Submit Boundary" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ComfyUiApprovedSubmitBoundaryPanel />
    </CodexForgeAppShell>
  );
}
