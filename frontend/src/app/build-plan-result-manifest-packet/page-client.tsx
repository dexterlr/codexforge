"use client";

import { BuildPlanResultManifestPacketPanel } from "@/lib/codexforge/build-plan-result-manifest-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanResultManifestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-result-manifest-packet"
      workspaceLabel="Build Plan Result Manifest Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanResultManifestPacketPanel />
    </CodexForgeAppShell>
  );
}
