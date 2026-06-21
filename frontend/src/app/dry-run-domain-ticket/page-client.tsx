"use client";

import { DryRunDomainTicketPanel } from "@/lib/codexforge/dry-run-domain-ticket/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunDomainTicketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-domain-ticket"
      workspaceLabel="Dry-Run Domain Ticket"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunDomainTicketPanel />
    </CodexForgeAppShell>
  );
}
