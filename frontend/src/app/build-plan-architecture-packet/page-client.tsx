"use client";

import { BuildPlanArchitecturePacketPanel } from "@/lib/codexforge/build-plan-architecture-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanArchitecturePacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-architecture-packet"
      workspaceLabel="Build Plan Architecture Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanArchitecturePacketPanel />
    </CodexForgeAppShell>
  );
}
