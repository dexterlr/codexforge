"use client";

import { LocalRuntimeModelRoutedExecutionPreviewPanel } from "@/lib/codexforge/local-runtime-model-routed-execution-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalRuntimeModelRoutedExecutionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-runtime-model-routed-execution-preview"
      workspaceLabel="Local Runtime Model-Routed Execution Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalRuntimeModelRoutedExecutionPreviewPanel />
    </CodexForgeAppShell>
  );
}
