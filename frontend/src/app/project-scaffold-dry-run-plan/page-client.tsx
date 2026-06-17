"use client";

import { ProjectScaffoldDryRunPlanPanel } from "@/lib/codexforge/project-scaffold-dry-run-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectScaffoldDryRunPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-scaffold-dry-run-plan"
      workspaceLabel="Project Scaffold Dry-Run Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectScaffoldDryRunPlanPanel />
    </CodexForgeAppShell>
  );
}
