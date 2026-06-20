"use client";

import { ProjectBuilderOperatorReviewPanel } from "@/lib/codexforge/project-builder-operator-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectBuilderOperatorReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-builder-operator-review"
      workspaceLabel="Project Builder Operator Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectBuilderOperatorReviewPanel />
    </CodexForgeAppShell>
  );
}
