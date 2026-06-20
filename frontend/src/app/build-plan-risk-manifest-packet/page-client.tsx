"use client";

import { BuildPlanRiskManifestPacketPanel } from "@/lib/codexforge/build-plan-risk-manifest-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanRiskManifestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-risk-manifest-packet"
      workspaceLabel="Build Plan Risk Manifest Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanRiskManifestPacketPanel />
    </CodexForgeAppShell>
  );
}
