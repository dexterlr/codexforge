"use client";

import { CockpitApprovalQueuePanel } from "@/lib/codexforge/cockpit-approval-queue-panel/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitApprovalQueuePanelPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-approval-queue-panel" workspaceLabel="Cockpit Approval Queue Panel" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitApprovalQueuePanel />
    </CodexForgeAppShell>
  );
}
