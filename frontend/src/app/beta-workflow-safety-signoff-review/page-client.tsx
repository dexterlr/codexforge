"use client";

import { BetaWorkflowSafetySignoffReviewPanel } from "@/lib/codexforge/beta-workflow-safety-signoff-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaWorkflowSafetySignoffReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-workflow-safety-signoff-review"
      workspaceLabel="Beta Safety Signoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaWorkflowSafetySignoffReviewPanel />
    </CodexForgeAppShell>
  );
}
