"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendApprovalDeniedPathMatrixPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-approval-denied-path-matrix"
      workspaceLabel="Backend Approval Denied Path Matrix"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-approval-denied-path-matrix" />
    </CodexForgeAppShell>
  );
}
