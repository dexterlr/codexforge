"use client";

import { TradingWorkspaceBuilderTargetPacketPanel } from "@/lib/codexforge/trading-workspace-builder-target-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TradingWorkspaceBuilderTargetPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/trading-workspace-builder-target-packet"
      workspaceLabel="Trading Workspace Builder Target Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TradingWorkspaceBuilderTargetPacketPanel />
    </CodexForgeAppShell>
  );
}
