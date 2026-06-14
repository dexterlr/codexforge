"use client";

import { UnifiedApprovalPolicyFinalReviewPanel } from "@/lib/codexforge/unified-approval-policy-final-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-approval-policy-final-review"
      workspaceLabel="Approval Policy Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedApprovalPolicyFinalReviewPanel />
    </CodexForgeAppShell>
  );
}
