"use client";

import { GitDiffReviewSurfacePanel } from "@/lib/codexforge/git-diff-review-surface/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GitDiffReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/git-diff-review"
      workspaceLabel="Git Diff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GitDiffReviewSurfacePanel />
    </CodexForgeAppShell>
  );
}
