"use client";

import { DryRunPackagingTicketPanel } from "@/lib/codexforge/dry-run-packaging-ticket/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunPackagingTicketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-packaging-ticket"
      workspaceLabel="Dry-Run Packaging Ticket"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunPackagingTicketPanel />
    </CodexForgeAppShell>
  );
}
