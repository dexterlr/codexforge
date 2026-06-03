"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ComfyUiWorkflowLibraryPanel } from "@/lib/codexforge/comfyui-workflow-library/components";

export default function ComfyUiWorkflowLibraryPageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-workflow-library" workspaceLabel="Workflow Library" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ComfyUiWorkflowLibraryPanel />
    </CodexForgeAppShell>
  );
}
