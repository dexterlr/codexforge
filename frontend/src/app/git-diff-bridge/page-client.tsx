"use client";

import { GitDiffBridgePanel } from "@/lib/codexforge/git-diff-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GitDiffBridgePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/git-diff-bridge"
      workspaceLabel="Git Diff Bridge"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GitDiffBridgePanel />
    </CodexForgeAppShell>
  );
}
