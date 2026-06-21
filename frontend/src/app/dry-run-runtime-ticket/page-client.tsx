"use client";

import { DryRunRuntimeTicketPanel } from "@/lib/codexforge/dry-run-runtime-ticket/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunRuntimeTicketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-runtime-ticket"
      workspaceLabel="Dry-Run Runtime Ticket"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunRuntimeTicketPanel />
    </CodexForgeAppShell>
  );
}
