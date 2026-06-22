"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendFileWriteHandoffContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-file-write-handoff-contract"
      workspaceLabel="Backend File Write Handoff Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-file-write-handoff-contract" />
    </CodexForgeAppShell>
  );
}
