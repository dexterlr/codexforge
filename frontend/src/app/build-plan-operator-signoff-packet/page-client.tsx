"use client";

import { BuildPlanOperatorSignoffPacketPanel } from "@/lib/codexforge/build-plan-operator-signoff-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanOperatorSignoffPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-operator-signoff-packet"
      workspaceLabel="Build Plan Operator Signoff Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanOperatorSignoffPacketPanel />
    </CodexForgeAppShell>
  );
}
