"use client";

import { AutomationLoopRealWorldTrialReviewPanel } from "@/lib/codexforge/automation-loop-real-world-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationLoopRealWorldTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-loop-real-world-trial-review"
      workspaceLabel="Automation Real Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationLoopRealWorldTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
