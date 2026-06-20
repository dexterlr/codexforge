"use client";

import { BuildPlanRequirementsPacketPanel } from "@/lib/codexforge/build-plan-requirements-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanRequirementsPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-requirements-packet"
      workspaceLabel="Build Plan Requirements Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanRequirementsPacketPanel />
    </CodexForgeAppShell>
  );
}
