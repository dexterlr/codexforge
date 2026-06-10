"use client";

import { SavedReviewViewsPanel } from "@/lib/codexforge/saved-review-views/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SavedReviewViewsPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/saved-review-views"
      workspaceLabel="Saved Views"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SavedReviewViewsPanel />
    </CodexForgeAppShell>
  );
}
