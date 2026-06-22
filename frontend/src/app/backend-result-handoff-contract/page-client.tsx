"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendResultHandoffContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-result-handoff-contract"
      workspaceLabel="Backend Result Handoff Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-result-handoff-contract" />
    </CodexForgeAppShell>
  );
}
