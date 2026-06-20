"use client";

import { DashboardBuilderTargetPacketPanel } from "@/lib/codexforge/dashboard-builder-target-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DashboardBuilderTargetPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dashboard-builder-target-packet"
      workspaceLabel="Dashboard Builder Target Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DashboardBuilderTargetPacketPanel />
    </CodexForgeAppShell>
  );
}
