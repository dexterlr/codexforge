"use client";

import { EndToEndWorkflowRecoveryReviewPanel } from "@/lib/codexforge/end-to-end-workflow-recovery-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EndToEndWorkflowRecoveryReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/end-to-end-workflow-recovery-review"
      workspaceLabel="End-to-End Recovery"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EndToEndWorkflowRecoveryReviewPanel />
    </CodexForgeAppShell>
  );
}
