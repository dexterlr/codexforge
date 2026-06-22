"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendApprovalOperatorSignoffPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-approval-operator-signoff"
      workspaceLabel="Backend Approval Operator Signoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-approval-operator-signoff" />
    </CodexForgeAppShell>
  );
}
