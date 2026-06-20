"use client";

import { BuildPlanRecoveryManifestPacketPanel } from "@/lib/codexforge/build-plan-recovery-manifest-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanRecoveryManifestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-recovery-manifest-packet"
      workspaceLabel="Build Plan Recovery Manifest Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanRecoveryManifestPacketPanel />
    </CodexForgeAppShell>
  );
}
