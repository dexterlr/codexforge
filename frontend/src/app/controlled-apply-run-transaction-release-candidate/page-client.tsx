"use client";

import { ApplyRunTransactionRoutePanel } from "@/lib/codexforge/apply-run-transaction/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledApplyRunTransactionReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-apply-run-transaction-release-candidate"
      workspaceLabel="Controlled Apply Run Transaction Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApplyRunTransactionRoutePanel routeSlug="controlled-apply-run-transaction-release-candidate" />
    </CodexForgeAppShell>
  );
}
