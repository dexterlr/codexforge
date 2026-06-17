"use client";

import { ProjectScaffoldResultReviewPanel } from "@/lib/codexforge/project-scaffold-result-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectScaffoldResultReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-scaffold-result-review"
      workspaceLabel="Project Scaffold Result Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectScaffoldResultReviewPanel />
    </CodexForgeAppShell>
  );
}
