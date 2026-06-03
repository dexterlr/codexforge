"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderAuditLogViewerPanel } from "@/lib/codexforge/provider-audit-log-viewer/components";

export default function ProviderAuditLogPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-audit-log"
      workspaceLabel="Provider Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderAuditLogViewerPanel />
    </CodexForgeAppShell>
  );
}
