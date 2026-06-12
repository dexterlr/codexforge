"use client";

import { AutomationApprovalQueueReviewPanel } from "@/lib/codexforge/automation-approval-queue-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationApprovalQueueReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-approval-queue-review"
      workspaceLabel="Automation Approval Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationApprovalQueueReviewPanel />
    </CodexForgeAppShell>
  );
}
