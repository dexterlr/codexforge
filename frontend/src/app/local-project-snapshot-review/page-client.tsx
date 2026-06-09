"use client";

import { LocalProjectSnapshotReviewPanel } from "@/lib/codexforge/local-project-snapshot-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalProjectSnapshotReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-project-snapshot-review"
      workspaceLabel="Project Snapshot"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalProjectSnapshotReviewPanel />
    </CodexForgeAppShell>
  );
}
