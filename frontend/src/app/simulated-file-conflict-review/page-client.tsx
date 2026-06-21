"use client";

import { SimulatedFileConflictReviewPanel } from "@/lib/codexforge/simulated-file-conflict-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileConflictReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-conflict-review"
      workspaceLabel="Simulated File Conflict Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileConflictReviewPanel />
    </CodexForgeAppShell>
  );
}
