"use client";

import { EndToEndApprovalFlowReviewPanel } from "@/lib/codexforge/end-to-end-approval-flow-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EndToEndApprovalFlowReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/end-to-end-approval-flow-review"
      workspaceLabel="E2E Approval"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EndToEndApprovalFlowReviewPanel />
    </CodexForgeAppShell>
  );
}
