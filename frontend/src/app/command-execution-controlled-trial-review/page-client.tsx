"use client";

import { CommandExecutionControlledTrialReviewPanel } from "@/lib/codexforge/command-execution-controlled-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandExecutionControlledTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-execution-controlled-trial-review"
      workspaceLabel="Command Execution Controlled Trial Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandExecutionControlledTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
