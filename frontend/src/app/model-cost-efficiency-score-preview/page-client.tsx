"use client";

import { ModelCostEfficiencyScorePreviewPanel } from "@/lib/codexforge/model-cost-efficiency-score-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelCostEfficiencyScorePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-cost-efficiency-score-preview"
      workspaceLabel="Model Cost Efficiency Score Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelCostEfficiencyScorePreviewPanel />
    </CodexForgeAppShell>
  );
}
