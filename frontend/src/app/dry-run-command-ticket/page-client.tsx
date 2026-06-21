"use client";

import { DryRunCmdTicketPanel } from "@/lib/codexforge/dry-run-command-ticket/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunCmdTicketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-command-ticket"
      workspaceLabel="Dry-Run Command Ticket"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunCmdTicketPanel />
    </CodexForgeAppShell>
  );
}
