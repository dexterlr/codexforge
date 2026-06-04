"use client";

import { GitCommitTrialBoundaryPanel } from "@/lib/codexforge/git-commit-trial-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GitCommitTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/git-commit-trial"
      workspaceLabel="Git Commit Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GitCommitTrialBoundaryPanel />
    </CodexForgeAppShell>
  );
}
