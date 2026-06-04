"use client";

import { GitStatusReviewSurfacePanel } from "@/lib/codexforge/git-status-review-surface/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GitStatusReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/git-status-review"
      workspaceLabel="Git Status"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GitStatusReviewSurfacePanel />
    </CodexForgeAppShell>
  );
}
