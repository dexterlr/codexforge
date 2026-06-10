"use client";

import { ApprovalQueueConsolidationPanel } from "@/lib/codexforge/approval-queue-consolidation/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovalQueuePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approval-queue"
      workspaceLabel="Approval Queue"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApprovalQueueConsolidationPanel />
    </CodexForgeAppShell>
  );
}
