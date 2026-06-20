"use client";

import { ToolBuilderTargetPacketPanel } from "@/lib/codexforge/tool-builder-target-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ToolBuilderTargetPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/tool-builder-target-packet"
      workspaceLabel="Tool Builder Target Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ToolBuilderTargetPacketPanel />
    </CodexForgeAppShell>
  );
}
