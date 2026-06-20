"use client";

import { ProjectEvidencePlanPreviewPanel } from "@/lib/codexforge/project-evidence-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectEvidencePlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-evidence-plan-preview"
      workspaceLabel="Project Evidence Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectEvidencePlanPreviewPanel />
    </CodexForgeAppShell>
  );
}
