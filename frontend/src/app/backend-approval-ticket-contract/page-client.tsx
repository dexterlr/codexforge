"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendApprovalTicketContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-approval-ticket-contract"
      workspaceLabel="Backend Approval Ticket Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-approval-ticket-contract" />
    </CodexForgeAppShell>
  );
}
