"use client";

import { ProjectScaffoldBackendContractPanel } from "@/lib/codexforge/project-scaffold-backend-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectScaffoldBackendContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-scaffold-backend-contract"
      workspaceLabel="Project Scaffold Backend Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectScaffoldBackendContractPanel />
    </CodexForgeAppShell>
  );
}
