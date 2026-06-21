"use client";

import { DryRunAdapterTicketPanel } from "@/lib/codexforge/dry-run-adapter-ticket/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunAdapterTicketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-adapter-ticket"
      workspaceLabel="Dry-Run Adapter Ticket"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunAdapterTicketPanel />
    </CodexForgeAppShell>
  );
}
