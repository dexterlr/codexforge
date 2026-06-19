"use client";

import { ModelRouterSelectionPreviewPanel } from "@/lib/codexforge/model-router-selection-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterSelectionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-selection-preview"
      workspaceLabel="Model Router Selection Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterSelectionPreviewPanel />
    </CodexForgeAppShell>
  );
}
