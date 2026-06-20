"use client";

import { ResultStoreModelRoutedExecutionPreviewPanel } from "@/lib/codexforge/result-store-model-routed-execution-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultStoreModelRoutedExecutionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-store-model-routed-execution-preview"
      workspaceLabel="Result Store Model-Routed Execution Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResultStoreModelRoutedExecutionPreviewPanel />
    </CodexForgeAppShell>
  );
}
