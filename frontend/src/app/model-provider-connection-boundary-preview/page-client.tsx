"use client";

import { ModelProviderConnectionBoundaryPreviewPanel } from "@/lib/codexforge/model-provider-connection-boundary-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelProviderConnectionBoundaryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-provider-connection-boundary-preview"
      workspaceLabel="Model Provider Connection Boundary Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelProviderConnectionBoundaryPreviewPanel />
    </CodexForgeAppShell>
  );
}
