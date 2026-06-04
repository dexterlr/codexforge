"use client";

import { GitCommitResultCapturePanel } from "@/lib/codexforge/git-commit-result-capture/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GitCommitResultPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/git-commit-result"
      workspaceLabel="Git Commit Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GitCommitResultCapturePanel />
    </CodexForgeAppShell>
  );
}
