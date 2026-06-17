"use client";

import { ConnectorAccessApprovalBoundaryPanel } from "@/lib/codexforge/connector-access-approval-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorAccessApprovalBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-access-approval-boundary"
      workspaceLabel="Connector Access Approval Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorAccessApprovalBoundaryPanel />
    </CodexForgeAppShell>
  );
}
