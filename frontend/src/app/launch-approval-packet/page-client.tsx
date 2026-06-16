"use client";

import { LaunchApprovalPacketPanel } from "@/lib/codexforge/launch-approval-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LaunchApprovalPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/launch-approval-packet"
      workspaceLabel="Launch Approval Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LaunchApprovalPacketPanel />
    </CodexForgeAppShell>
  );
}
