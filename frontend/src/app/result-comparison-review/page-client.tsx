"use client";

import { ResultComparisonReviewPanel } from "@/lib/codexforge/result-comparison-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultComparisonReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-comparison-review"
      workspaceLabel="Result Comparison"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResultComparisonReviewPanel />
    </CodexForgeAppShell>
  );
}
