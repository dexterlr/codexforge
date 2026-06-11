"use client";

import { CodingWorkflowReadinessAuditPanel } from "@/lib/codexforge/coding-workflow-readiness-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodingWorkflowReadinessAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/coding-workflow-readiness-audit"
      workspaceLabel="Coding Workflow Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodingWorkflowReadinessAuditPanel />
    </CodexForgeAppShell>
  );
}
