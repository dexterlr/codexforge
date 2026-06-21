"use client";

import { GuardedExecutionDryRunTicketPanel } from "@/lib/codexforge/guarded-execution-dry-run-ticket/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedExecutionDryRunTicketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-execution-dry-run-ticket"
      workspaceLabel="Guarded Execution Dry-Run Ticket"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedExecutionDryRunTicketPanel />
    </CodexForgeAppShell>
  );
}
