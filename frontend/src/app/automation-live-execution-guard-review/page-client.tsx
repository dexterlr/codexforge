"use client";

import { AutomationLiveExecutionGuardReviewPanel } from "@/lib/codexforge/automation-live-execution-guard-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationLiveExecutionGuardReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-live-execution-guard-review"
      workspaceLabel="Automation Live Guard"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationLiveExecutionGuardReviewPanel />
    </CodexForgeAppShell>
  );
}
