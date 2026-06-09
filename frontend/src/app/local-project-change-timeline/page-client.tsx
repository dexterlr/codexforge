"use client";

import { LocalProjectChangeTimelineReviewPanel } from "@/lib/codexforge/local-project-change-timeline-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalProjectChangeTimelinePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-project-change-timeline"
      workspaceLabel="Change Timeline"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalProjectChangeTimelineReviewPanel />
    </CodexForgeAppShell>
  );
}
