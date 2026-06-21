"use client";

import { DryRunFileWriteTicketPanel } from "@/lib/codexforge/dry-run-file-write-ticket/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunFileWriteTicketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-file-write-ticket"
      workspaceLabel="Dry-Run File Write Ticket"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunFileWriteTicketPanel />
    </CodexForgeAppShell>
  );
}
