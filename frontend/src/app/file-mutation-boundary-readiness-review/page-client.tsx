"use client";

import { FileMutationBoundaryReadinessReviewPanel } from "@/lib/codexforge/file-mutation-boundary-readiness-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileMutationBoundaryReadinessReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-mutation-boundary-readiness-review"
      workspaceLabel="File Mutation Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileMutationBoundaryReadinessReviewPanel />
    </CodexForgeAppShell>
  );
}
