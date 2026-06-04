"use client";

import { GitCommitApprovalBoundaryPanel } from "@/lib/codexforge/git-commit-approval-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GitCommitApprovalPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/git-commit-approval"
      workspaceLabel="Commit Approval"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GitCommitApprovalBoundaryPanel />
    </CodexForgeAppShell>
  );
}
