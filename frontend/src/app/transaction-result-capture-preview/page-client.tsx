"use client";

import { ApplyRunTransactionRoutePanel } from "@/lib/codexforge/apply-run-transaction/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TransactionResultCapturePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/transaction-result-capture-preview"
      workspaceLabel="Transaction Result Capture Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApplyRunTransactionRoutePanel routeSlug="transaction-result-capture-preview" />
    </CodexForgeAppShell>
  );
}
