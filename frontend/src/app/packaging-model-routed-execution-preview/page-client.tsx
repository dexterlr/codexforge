"use client";

import { PackagingModelRoutedExecutionPreviewPanel } from "@/lib/codexforge/packaging-model-routed-execution-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PackagingModelRoutedExecutionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/packaging-model-routed-execution-preview"
      workspaceLabel="Packaging Model-Routed Execution Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PackagingModelRoutedExecutionPreviewPanel />
    </CodexForgeAppShell>
  );
}
