"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ComfyUiWorkflowImportPreviewPanel } from "@/lib/codexforge/comfyui-workflow-import-preview/components";

export default function ComfyUiWorkflowImportPageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-workflows/import" workspaceLabel="Workflow Import" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ComfyUiWorkflowImportPreviewPanel />
    </CodexForgeAppShell>
  );
}
