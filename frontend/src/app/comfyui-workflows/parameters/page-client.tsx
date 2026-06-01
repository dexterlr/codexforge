"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ComfyUiWorkflowParameterMapperPanel } from "@/lib/codexforge/comfyui-workflow-parameter-mapper/components";

export default function ComfyUiWorkflowParametersPageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-workflows/parameters" workspaceLabel="Workflow Parameters" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ComfyUiWorkflowParameterMapperPanel />
    </CodexForgeAppShell>
  );
}
