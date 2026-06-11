"use client";

import { ResearchWorkflowReadinessAuditPanel } from "@/lib/codexforge/research-workflow-readiness-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchWorkflowReadinessAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-workflow-readiness-audit"
      workspaceLabel="Research Workflow Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchWorkflowReadinessAuditPanel />
    </CodexForgeAppShell>
  );
}
