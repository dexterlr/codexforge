"use client";

import { ModelRoutedExecutionApprovalPacketPanel } from "@/lib/codexforge/model-routed-execution-approval-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRoutedExecutionApprovalPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-routed-execution-approval-packet"
      workspaceLabel="Model-Routed Execution Approval Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRoutedExecutionApprovalPacketPanel />
    </CodexForgeAppShell>
  );
}
