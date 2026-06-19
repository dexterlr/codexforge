"use client";

import { ModelUsageBudgetPreviewPanel } from "@/lib/codexforge/model-usage-budget-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelUsageBudgetPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-usage-budget-preview"
      workspaceLabel="Model Usage Budget Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelUsageBudgetPreviewPanel />
    </CodexForgeAppShell>
  );
}
