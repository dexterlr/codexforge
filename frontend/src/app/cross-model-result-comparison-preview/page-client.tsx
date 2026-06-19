"use client";

import { CrossModelResultComparisonPreviewPanel } from "@/lib/codexforge/cross-model-result-comparison-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CrossModelResultComparisonPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cross-model-result-comparison-preview"
      workspaceLabel="Cross-Model Result Comparison Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CrossModelResultComparisonPreviewPanel />
    </CodexForgeAppShell>
  );
}
