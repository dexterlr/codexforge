"use client";

import { BuildPlanApprovalManifestPacketPanel } from "@/lib/codexforge/build-plan-approval-manifest-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanApprovalManifestPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-approval-manifest-packet"
      workspaceLabel="Build Plan Approval Manifest Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanApprovalManifestPacketPanel />
    </CodexForgeAppShell>
  );
}
