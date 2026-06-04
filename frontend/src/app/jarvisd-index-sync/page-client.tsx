"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdWorkspaceIndexSyncPanel } from "@/lib/codexforge/jarvisd-workspace-index-sync/components";

export default function JarvisdIndexSyncPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-index-sync"
      workspaceLabel="Jarvisd Index Sync"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdWorkspaceIndexSyncPanel />
    </CodexForgeAppShell>
  );
}
