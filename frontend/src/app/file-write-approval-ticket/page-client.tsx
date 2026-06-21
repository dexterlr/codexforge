"use client";

import { FileWriteApprovalTicketPanel } from "@/lib/codexforge/file-write-approval-ticket/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteApprovalTicketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-approval-ticket"
      workspaceLabel="File Write Approval Ticket"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteApprovalTicketPanel />
    </CodexForgeAppShell>
  );
}
