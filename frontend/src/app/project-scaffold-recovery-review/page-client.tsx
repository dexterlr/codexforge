"use client";

import { ProjectScaffoldRecoveryReviewPanel } from "@/lib/codexforge/project-scaffold-recovery-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectScaffoldRecoveryReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-scaffold-recovery-review"
      workspaceLabel="Project Scaffold Recovery Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectScaffoldRecoveryReviewPanel />
    </CodexForgeAppShell>
  );
}
