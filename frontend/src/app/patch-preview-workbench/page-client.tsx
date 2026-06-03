"use client";

import { PatchPreviewWorkbenchPanel } from "@/lib/codexforge/patch-preview-workbench/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PatchPreviewWorkbenchPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/patch-preview-workbench"
      workspaceLabel="Patch Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PatchPreviewWorkbenchPanel />
    </CodexForgeAppShell>
  );
}
