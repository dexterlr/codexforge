"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ComfyUiWorkflowDryRunContractPanel } from "@/lib/codexforge/comfyui-workflow-dry-run-contract/components";

export default function ComfyUiWorkflowDryRunPageClient() {
  return (
    <CodexForgeAppShell activePath="/comfyui-workflows/dry-run" workspaceLabel="Workflow Dry Run" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ComfyUiWorkflowDryRunContractPanel />
    </CodexForgeAppShell>
  );
}
