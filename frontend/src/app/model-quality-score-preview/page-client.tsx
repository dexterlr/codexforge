"use client";

import { ModelQualityScorePreviewPanel } from "@/lib/codexforge/model-quality-score-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelQualityScorePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-quality-score-preview"
      workspaceLabel="Model Quality Score Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelQualityScorePreviewPanel />
    </CodexForgeAppShell>
  );
}
