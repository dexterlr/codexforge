"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ComfyUiWorkflowSafetyInspectorPanel } from "@/lib/codexforge/comfyui-workflow-safety-inspector/components";

export default function ComfyUiWorkflowSafetyPageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-workflows/safety" workspaceLabel="Workflow Safety" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ComfyUiWorkflowSafetyInspectorPanel />
    </CodexForgeAppShell>
  );
}
