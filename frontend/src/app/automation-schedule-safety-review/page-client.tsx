"use client";

import { AutomationScheduleSafetyReviewPanel } from "@/lib/codexforge/automation-schedule-safety-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationScheduleSafetyReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-schedule-safety-review"
      workspaceLabel="Automation Schedule Safety"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationScheduleSafetyReviewPanel />
    </CodexForgeAppShell>
  );
}
