"use client";

import { AutomationDryRunTrialReviewPanel } from "@/lib/codexforge/automation-dry-run-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationDryRunTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-dry-run-trial-review"
      workspaceLabel="Automation Dry-Run Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationDryRunTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
