"use client";

import { ProjectFileSearchPreviewPanel } from "@/lib/codexforge/project-file-search-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectFileSearchPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-file-search"
      workspaceLabel="File Search"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectFileSearchPreviewPanel />
    </CodexForgeAppShell>
  );
}
