"use client";

import { BuildPlanSummaryPacketPanel } from "@/lib/codexforge/build-plan-summary-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanSummaryPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-summary-packet"
      workspaceLabel="Build Plan Summary Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanSummaryPacketPanel />
    </CodexForgeAppShell>
  );
}
