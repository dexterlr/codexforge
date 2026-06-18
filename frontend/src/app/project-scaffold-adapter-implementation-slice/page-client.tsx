"use client";

import { ProjectScaffoldAdapterImplementationSlicePanel } from "@/lib/codexforge/project-scaffold-adapter-implementation-slice/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectScaffoldAdapterImplementationSlicePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-scaffold-adapter-implementation-slice"
      workspaceLabel="Project Scaffold Adapter Implementation Slice"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectScaffoldAdapterImplementationSlicePanel />
    </CodexForgeAppShell>
  );
}
