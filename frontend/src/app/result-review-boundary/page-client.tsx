"use client";

import { ResultReviewBoundaryPanel } from "@/lib/codexforge/result-review-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultReviewBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-review-boundary"
      workspaceLabel="Result Review Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResultReviewBoundaryPanel />
    </CodexForgeAppShell>
  );
}
