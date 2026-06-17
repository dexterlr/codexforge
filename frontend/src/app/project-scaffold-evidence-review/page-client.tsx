"use client";

import { ProjectScaffoldEvidenceReviewPanel } from "@/lib/codexforge/project-scaffold-evidence-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectScaffoldEvidenceReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-scaffold-evidence-review"
      workspaceLabel="Project Scaffold Evidence Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectScaffoldEvidenceReviewPanel />
    </CodexForgeAppShell>
  );
}
