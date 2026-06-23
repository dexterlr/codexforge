"use client";

import { ApplyRunTransactionRoutePanel } from "@/lib/codexforge/apply-run-transaction/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TransactionRecoveryDecisionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/transaction-recovery-decision-preview"
      workspaceLabel="Transaction Recovery Decision Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApplyRunTransactionRoutePanel routeSlug="transaction-recovery-decision-preview" />
    </CodexForgeAppShell>
  );
}
