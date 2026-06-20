"use client";

import { BuildPlanApprovalDetailPacketPanel } from "@/lib/codexforge/build-plan-approval-detail-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanApprovalDetailPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-approval-detail-packet"
      workspaceLabel="Build Plan Approval Detail Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanApprovalDetailPacketPanel />
    </CodexForgeAppShell>
  );
}
