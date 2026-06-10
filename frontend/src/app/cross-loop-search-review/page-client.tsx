"use client";

import { CrossLoopSearchReviewPanel } from "@/lib/codexforge/cross-loop-search-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CrossLoopSearchReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cross-loop-search-review"
      workspaceLabel="Loop Search"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CrossLoopSearchReviewPanel />
    </CodexForgeAppShell>
  );
}
