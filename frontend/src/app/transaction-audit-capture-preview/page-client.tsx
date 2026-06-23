"use client";

import { ApplyRunTransactionRoutePanel } from "@/lib/codexforge/apply-run-transaction/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TransactionAuditCapturePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/transaction-audit-capture-preview"
      workspaceLabel="Transaction Audit Capture Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApplyRunTransactionRoutePanel routeSlug="transaction-audit-capture-preview" />
    </CodexForgeAppShell>
  );
}
