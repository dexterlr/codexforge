"use client";

import { PullRequestPrepReviewPanel } from "@/lib/codexforge/pull-request-prep-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PullRequestPrepReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/pull-request-prep-review"
      workspaceLabel="PR Prep"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PullRequestPrepReviewPanel />
    </CodexForgeAppShell>
  );
}
