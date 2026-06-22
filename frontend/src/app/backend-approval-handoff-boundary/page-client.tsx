"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendApprovalHandoffBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-approval-handoff-boundary"
      workspaceLabel="Backend Approval Handoff Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-approval-handoff-boundary" />
    </CodexForgeAppShell>
  );
}
