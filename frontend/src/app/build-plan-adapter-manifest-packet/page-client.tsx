"use client";

import { BuildPlanAdapterManifestPacketPanel } from "@/lib/codexforge/build-plan-adapter-manifest-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanAdapterManifestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-adapter-manifest-packet"
      workspaceLabel="Build Plan Adapter Manifest Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanAdapterManifestPacketPanel />
    </CodexForgeAppShell>
  );
}
