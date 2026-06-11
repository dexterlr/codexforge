"use client";

import { ProjectKnowledgeSearchPreviewPanel } from "@/lib/codexforge/project-knowledge-search-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectKnowledgeSearchPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-knowledge-search-preview"
      workspaceLabel="Knowledge Search"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectKnowledgeSearchPreviewPanel />
    </CodexForgeAppShell>
  );
}
