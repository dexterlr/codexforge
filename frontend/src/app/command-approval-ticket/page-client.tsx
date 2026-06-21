"use client";

import { CommandApprovalTicketPanel } from "@/lib/codexforge/command-approval-ticket/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandApprovalTicketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-approval-ticket"
      workspaceLabel="Command Approval Ticket"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandApprovalTicketPanel />
    </CodexForgeAppShell>
  );
}
