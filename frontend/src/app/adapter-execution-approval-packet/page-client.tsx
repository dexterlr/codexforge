"use client";

import { AdapterExecutionApprovalPacketPanel } from "@/lib/codexforge/adapter-execution-approval-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterExecutionApprovalPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-execution-approval-packet"
      workspaceLabel="Adapter Execution Approval Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterExecutionApprovalPacketPanel />
    </CodexForgeAppShell>
  );
}
