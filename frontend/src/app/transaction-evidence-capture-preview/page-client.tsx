"use client";

import { ApplyRunTransactionRoutePanel } from "@/lib/codexforge/apply-run-transaction/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TransactionEvidenceCapturePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/transaction-evidence-capture-preview"
      workspaceLabel="Transaction Evidence Capture Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApplyRunTransactionRoutePanel routeSlug="transaction-evidence-capture-preview" />
    </CodexForgeAppShell>
  );
}
