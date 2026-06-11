"use client";

import { AutomationPermissionReadinessAuditPanel } from "@/lib/codexforge/automation-permission-readiness-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationPermissionReadinessAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-permission-readiness-audit"
      workspaceLabel="Automation Permission Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationPermissionReadinessAuditPanel />
    </CodexForgeAppShell>
  );
}
