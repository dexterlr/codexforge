"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendAuditHandoffContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-audit-handoff-contract"
      workspaceLabel="Backend Audit Handoff Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-audit-handoff-contract" />
    </CodexForgeAppShell>
  );
}
