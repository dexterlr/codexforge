"use client";

import { ApplyRunTransactionRoutePanel } from "@/lib/codexforge/apply-run-transaction/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstApplyRunTransactionCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-apply-run-transaction-candidate"
      workspaceLabel="First Apply Run Transaction Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApplyRunTransactionRoutePanel routeSlug="first-apply-run-transaction-candidate" />
    </CodexForgeAppShell>
  );
}
