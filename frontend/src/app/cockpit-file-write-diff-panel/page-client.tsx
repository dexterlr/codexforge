"use client";

import { CockpitFileWriteDiffPanel } from "@/lib/codexforge/cockpit-file-write-diff-panel/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitFileWriteDiffPanelPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-file-write-diff-panel" workspaceLabel="Cockpit File Write Diff Panel" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitFileWriteDiffPanel />
    </CodexForgeAppShell>
  );
}
