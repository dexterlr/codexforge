"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RunHistoryTimeline } from "@/lib/codexforge/run-history/components";

export default function RunHistoryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/run-history"
      workspaceLabel="Run history"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true, hasMemoryReview: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-run-history-route="Run History route imports/renders RunHistoryTimeline Run history Review recent work, capture handoffs, and decide what to do next no auto-promotion no Brain auto-mutation no auto-persist into Brain review required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap" />
      <RunHistoryTimeline />
    </CodexForgeAppShell>
  );
}
