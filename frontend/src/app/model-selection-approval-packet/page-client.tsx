"use client";

import { ModelSelectionApprovalPacketPanel } from "@/lib/codexforge/model-selection-approval-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelSelectionApprovalPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-selection-approval-packet"
      workspaceLabel="Model Selection Approval Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelSelectionApprovalPacketPanel />
    </CodexForgeAppShell>
  );
}
