"use client";

import { ModelEfficiencyScoringPreviewPanel } from "@/lib/codexforge/model-efficiency-scoring-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelEfficiencyScoringPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-efficiency-scoring-preview"
      workspaceLabel="Model Efficiency Scoring Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelEfficiencyScoringPreviewPanel />
    </CodexForgeAppShell>
  );
}
