"use client";

import { ProjectApprovalPlanPreviewPanel } from "@/lib/codexforge/project-approval-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectApprovalPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-approval-plan-preview"
      workspaceLabel="Project Approval Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectApprovalPlanPreviewPanel />
    </CodexForgeAppShell>
  );
}
