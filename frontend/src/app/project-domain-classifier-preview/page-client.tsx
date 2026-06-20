"use client";

import { ProjectDomainClassifierPreviewPanel } from "@/lib/codexforge/project-domain-classifier-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectDomainClassifierPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-domain-classifier-preview"
      workspaceLabel="Project Domain Classifier Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectDomainClassifierPreviewPanel />
    </CodexForgeAppShell>
  );
}
