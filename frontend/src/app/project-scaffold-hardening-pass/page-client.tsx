"use client";

import { ProjectScaffoldHardeningPassPanel } from "@/lib/codexforge/project-scaffold-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectScaffoldHardeningPassPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-scaffold-hardening-pass"
      workspaceLabel="Project Scaffold Hardening Pass"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectScaffoldHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
