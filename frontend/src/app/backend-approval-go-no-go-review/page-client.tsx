"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendApprovalGoNoGoReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-approval-go-no-go-review"
      workspaceLabel="Backend Approval Go No Go Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-approval-go-no-go-review" />
    </CodexForgeAppShell>
  );
}
