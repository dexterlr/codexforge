"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstBackendApprovalHandoffCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-backend-approval-handoff-candidate"
      workspaceLabel="First Backend Approval Handoff Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="first-backend-approval-handoff-candidate" />
    </CodexForgeAppShell>
  );
}
