"use client";

import { FirstCommandExecutionTrialReviewPanel } from "@/lib/codexforge/first-command-execution-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstCommandExecutionTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-command-execution-trial-review"
      workspaceLabel="First Command Execution Trial Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstCommandExecutionTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
