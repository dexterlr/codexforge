"use client";

import { ModelRoutedExecutionSandboxReviewPanel } from "@/lib/codexforge/model-routed-execution-sandbox-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRoutedExecutionSandboxReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-routed-execution-sandbox-review"
      workspaceLabel="Model-Routed Execution Sandbox Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRoutedExecutionSandboxReviewPanel />
    </CodexForgeAppShell>
  );
}
