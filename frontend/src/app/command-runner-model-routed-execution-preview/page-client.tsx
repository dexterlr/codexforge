"use client";

import { CommandRunnerModelRoutedExecutionPreviewPanel } from "@/lib/codexforge/command-runner-model-routed-execution-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandRunnerModelRoutedExecutionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-runner-model-routed-execution-preview"
      workspaceLabel="Command Runner Model-Routed Execution Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerModelRoutedExecutionPreviewPanel />
    </CodexForgeAppShell>
  );
}
