"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendCommandHandoffContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-command-handoff-contract"
      workspaceLabel="Backend Command Handoff Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-command-handoff-contract" />
    </CodexForgeAppShell>
  );
}
