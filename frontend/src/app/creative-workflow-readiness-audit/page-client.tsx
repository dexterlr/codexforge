"use client";

import { CreativeWorkflowReadinessAuditPanel } from "@/lib/codexforge/creative-workflow-readiness-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CreativeWorkflowReadinessAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/creative-workflow-readiness-audit"
      workspaceLabel="Creative Workflow Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CreativeWorkflowReadinessAuditPanel />
    </CodexForgeAppShell>
  );
}
