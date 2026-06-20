"use client";

import { BuildPlanRuntimeManifestPacketPanel } from "@/lib/codexforge/build-plan-runtime-manifest-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanRuntimeManifestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-runtime-manifest-packet"
      workspaceLabel="Build Plan Runtime Manifest Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanRuntimeManifestPacketPanel />
    </CodexForgeAppShell>
  );
}
