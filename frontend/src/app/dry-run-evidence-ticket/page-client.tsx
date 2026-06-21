"use client";

import { DryRunEvidenceTicketPanel } from "@/lib/codexforge/dry-run-evidence-ticket/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunEvidenceTicketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-evidence-ticket"
      workspaceLabel="Dry-Run Evidence Ticket"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunEvidenceTicketPanel />
    </CodexForgeAppShell>
  );
}
