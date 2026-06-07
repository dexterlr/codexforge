"use client";

import { PatchPreviewWorkbenchLiveContextIntegrationPanel } from "@/lib/codexforge/patch-preview-workbench-live-context-integration/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PatchPreviewLiveContextPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/patch-preview-live-context"
      workspaceLabel="Patch Context"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PatchPreviewWorkbenchLiveContextIntegrationPanel />
    </CodexForgeAppShell>
  );
}
