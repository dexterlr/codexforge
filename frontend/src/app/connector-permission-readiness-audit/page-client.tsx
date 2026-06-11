"use client";

import { ConnectorPermissionReadinessAuditPanel } from "@/lib/codexforge/connector-permission-readiness-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorPermissionReadinessAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-permission-readiness-audit"
      workspaceLabel="Connector Permission Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorPermissionReadinessAuditPanel />
    </CodexForgeAppShell>
  );
}
