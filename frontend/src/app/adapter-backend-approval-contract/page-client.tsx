"use client";

import { AdapterBackendApprovalContractPanel } from "@/lib/codexforge/adapter-backend-approval-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterBackendApprovalContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-backend-approval-contract"
      workspaceLabel="Adapter Backend Approval Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterBackendApprovalContractPanel />
    </CodexForgeAppShell>
  );
}
