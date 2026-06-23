"use client";

import { ApplyRunTransactionRoutePanel } from "@/lib/codexforge/apply-run-transaction/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TransactionValidationStepPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/transaction-validation-step"
      workspaceLabel="Transaction Validation Step"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApplyRunTransactionRoutePanel routeSlug="transaction-validation-step" />
    </CodexForgeAppShell>
  );
}
