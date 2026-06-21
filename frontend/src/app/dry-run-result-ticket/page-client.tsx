"use client";

import { DryRunResultTicketPanel } from "@/lib/codexforge/dry-run-result-ticket/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunResultTicketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-result-ticket"
      workspaceLabel="Dry-Run Result Ticket"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunResultTicketPanel />
    </CodexForgeAppShell>
  );
}
