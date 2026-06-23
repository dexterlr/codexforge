"use client";

import { ApplyRunTransactionRoutePanel } from "@/lib/codexforge/apply-run-transaction/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitTransactionSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-transaction-summary"
      workspaceLabel="Cockpit Transaction Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApplyRunTransactionRoutePanel routeSlug="cockpit-transaction-summary" />
    </CodexForgeAppShell>
  );
}
