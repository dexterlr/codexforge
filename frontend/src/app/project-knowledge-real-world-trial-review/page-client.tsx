"use client";

import { ProjectKnowledgeRealWorldTrialReviewPanel } from "@/lib/codexforge/project-knowledge-real-world-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectKnowledgeRealWorldTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-knowledge-real-world-trial-review"
      workspaceLabel="Project Real Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectKnowledgeRealWorldTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
