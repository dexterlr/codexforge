"use client";

import { ApplyRunTransactionRoutePanel } from "@/lib/codexforge/apply-run-transaction/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TransactionRollbackReadinessPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/transaction-rollback-readiness-preview"
      workspaceLabel="Transaction Rollback Readiness Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApplyRunTransactionRoutePanel routeSlug="transaction-rollback-readiness-preview" />
    </CodexForgeAppShell>
  );
}
