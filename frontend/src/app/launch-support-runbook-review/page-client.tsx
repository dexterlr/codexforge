"use client";

import { LaunchSupportRunbookReviewPanel } from "@/lib/codexforge/launch-support-runbook-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LaunchSupportRunbookReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/launch-support-runbook-review"
      workspaceLabel="Launch Support Runbook Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LaunchSupportRunbookReviewPanel />
    </CodexForgeAppShell>
  );
}
