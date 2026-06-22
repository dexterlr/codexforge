"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledBackendApprovalHandoffReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-backend-approval-handoff-release-candidate"
      workspaceLabel="Controlled Backend Approval Handoff Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="controlled-backend-approval-handoff-release-candidate" />
    </CodexForgeAppShell>
  );
}
