"use client";

import { GitStatusBridgePanel } from "@/lib/codexforge/git-status-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GitStatusBridgePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/git-status-bridge"
      workspaceLabel="Git Status Bridge"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GitStatusBridgePanel />
    </CodexForgeAppShell>
  );
}
