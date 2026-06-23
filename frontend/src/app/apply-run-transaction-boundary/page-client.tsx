"use client";

import { ApplyRunTransactionRoutePanel } from "@/lib/codexforge/apply-run-transaction/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApplyRunTransactionBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/apply-run-transaction-boundary"
      workspaceLabel="Apply Run Transaction Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApplyRunTransactionRoutePanel routeSlug="apply-run-transaction-boundary" />
    </CodexForgeAppShell>
  );
}
