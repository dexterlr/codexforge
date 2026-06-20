"use client";

import { ProjectRecoveryPlanPreviewPanel } from "@/lib/codexforge/project-recovery-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectRecoveryPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-recovery-plan-preview"
      workspaceLabel="Project Recovery Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectRecoveryPlanPreviewPanel />
    </CodexForgeAppShell>
  );
}
