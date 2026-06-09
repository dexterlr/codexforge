"use client";

import { ProjectKnowledgeReleaseCandidatePanel } from "@/lib/codexforge/project-knowledge-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectKnowledgeReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-knowledge-release-candidate"
      workspaceLabel="Knowledge Release"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectKnowledgeReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
