"use client";

import { RealDailyWorkflowRecoveryReviewPanel } from "@/lib/codexforge/real-daily-workflow-recovery-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-daily-workflow-recovery-review"
      workspaceLabel="Recovery Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealDailyWorkflowRecoveryReviewPanel />
    </CodexForgeAppShell>
  );
}
