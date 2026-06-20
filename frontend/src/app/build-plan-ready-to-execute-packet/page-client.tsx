"use client";

import { BuildPlanReadyToExecutePacketPanel } from "@/lib/codexforge/build-plan-ready-to-execute-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanReadyToExecutePacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-ready-to-execute-packet"
      workspaceLabel="Build Plan Ready-To-Execute Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanReadyToExecutePacketPanel />
    </CodexForgeAppShell>
  );
}
