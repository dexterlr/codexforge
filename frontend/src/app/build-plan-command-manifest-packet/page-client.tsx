"use client";

import { BuildPlanCommandManifestPacketPanel } from "@/lib/codexforge/build-plan-command-manifest-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanCommandManifestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-command-manifest-packet"
      workspaceLabel="Build Plan Command Manifest Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanCommandManifestPacketPanel />
    </CodexForgeAppShell>
  );
}
