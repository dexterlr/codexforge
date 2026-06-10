"use client";

import { GlobalReviewInboxConsolidationPanel } from "@/lib/codexforge/global-review-inbox-consolidation/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GlobalReviewInboxPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/global-review-inbox"
      workspaceLabel="Global Inbox"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GlobalReviewInboxConsolidationPanel />
    </CodexForgeAppShell>
  );
}
