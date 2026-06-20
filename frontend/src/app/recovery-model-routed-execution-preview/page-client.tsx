"use client";

import { RecoveryModelRoutedExecutionPreviewPanel } from "@/lib/codexforge/recovery-model-routed-execution-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryModelRoutedExecutionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-model-routed-execution-preview"
      workspaceLabel="Recovery Model-Routed Execution Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RecoveryModelRoutedExecutionPreviewPanel />
    </CodexForgeAppShell>
  );
}
