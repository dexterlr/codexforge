"use client";

import { ConditionalWatchReviewInboxPanel } from "@/lib/codexforge/conditional-watch-review-inbox/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConditionalWatchReviewInboxPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/conditional-watch-review-inbox"
      workspaceLabel="Conditional Watch Review Inbox"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConditionalWatchReviewInboxPanel />
    </CodexForgeAppShell>
  );
}
