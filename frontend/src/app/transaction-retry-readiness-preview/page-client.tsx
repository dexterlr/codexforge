"use client";

import { ApplyRunTransactionRoutePanel } from "@/lib/codexforge/apply-run-transaction/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TransactionRetryReadinessPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/transaction-retry-readiness-preview"
      workspaceLabel="Transaction Retry Readiness Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApplyRunTransactionRoutePanel routeSlug="transaction-retry-readiness-preview" />
    </CodexForgeAppShell>
  );
}
