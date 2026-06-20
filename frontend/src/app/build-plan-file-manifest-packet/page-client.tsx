"use client";

import { BuildPlanFileManifestPacketPanel } from "@/lib/codexforge/build-plan-file-manifest-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanFileManifestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-file-manifest-packet"
      workspaceLabel="Build Plan File Manifest Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanFileManifestPacketPanel />
    </CodexForgeAppShell>
  );
}
