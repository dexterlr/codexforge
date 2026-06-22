"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendRecoveryHandoffContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-recovery-handoff-contract"
      workspaceLabel="Backend Recovery Handoff Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-recovery-handoff-contract" />
    </CodexForgeAppShell>
  );
}
