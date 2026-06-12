"use client";

import { FirstLiveTrialRunbookReviewPanel } from "@/lib/codexforge/first-live-trial-runbook-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstLiveTrialRunbookReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-live-trial-runbook-review"
      workspaceLabel="Live Trial Runbook"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstLiveTrialRunbookReviewPanel />
    </CodexForgeAppShell>
  );
}
