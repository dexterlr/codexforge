"use client";

import { DryRunRecoveryTicketPanel } from "@/lib/codexforge/dry-run-recovery-ticket/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunRecoveryTicketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-recovery-ticket"
      workspaceLabel="Dry-Run Recovery Ticket"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunRecoveryTicketPanel />
    </CodexForgeAppShell>
  );
}
