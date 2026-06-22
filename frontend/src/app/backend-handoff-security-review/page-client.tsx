"use client";

import { BackendApprovalHandoffRoutePanel } from "@/lib/codexforge/backend-approval-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendHandoffSecurityReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-handoff-security-review"
      workspaceLabel="Backend Handoff Security Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendApprovalHandoffRoutePanel routeSlug="backend-handoff-security-review" />
    </CodexForgeAppShell>
  );
}
