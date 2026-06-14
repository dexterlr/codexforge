"use client";

import { CodexForgeFoundation500MilestoneReviewPanel } from "@/lib/codexforge/codexforge-foundation-500-milestone-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-foundation-500-milestone-review"
      workspaceLabel="Foundation 500"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeFoundation500MilestoneReviewPanel />
    </CodexForgeAppShell>
  );
}
