"use client";

import { DataWorkspaceBuilderTargetPacketPanel } from "@/lib/codexforge/data-workspace-builder-target-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DataWorkspaceBuilderTargetPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/data-workspace-builder-target-packet"
      workspaceLabel="Data Workspace Builder Target Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DataWorkspaceBuilderTargetPacketPanel />
    </CodexForgeAppShell>
  );
}
