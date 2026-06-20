"use client";

import { FileWriteModelRoutedExecutionPreviewPanel } from "@/lib/codexforge/file-write-model-routed-execution-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteModelRoutedExecutionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-model-routed-execution-preview"
      workspaceLabel="File Write Model-Routed Execution Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteModelRoutedExecutionPreviewPanel />
    </CodexForgeAppShell>
  );
}
