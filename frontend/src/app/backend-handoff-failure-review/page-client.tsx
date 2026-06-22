"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendHandoffFailureReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-handoff-failure-review"
      workspaceLabel="Backend Handoff Failure Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-handoff-failure-review" />
    </CodexForgeAppShell>
  );
}
