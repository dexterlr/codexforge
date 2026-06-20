"use client";

import { BuildPlanEvidenceManifestPacketPanel } from "@/lib/codexforge/build-plan-evidence-manifest-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanEvidenceManifestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-evidence-manifest-packet"
      workspaceLabel="Build Plan Evidence Manifest Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanEvidenceManifestPacketPanel />
    </CodexForgeAppShell>
  );
}
