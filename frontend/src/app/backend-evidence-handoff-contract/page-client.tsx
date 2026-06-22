"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendEvidenceHandoffContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-evidence-handoff-contract"
      workspaceLabel="Backend Evidence Handoff Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-evidence-handoff-contract" />
    </CodexForgeAppShell>
  );
}
