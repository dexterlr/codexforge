"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdAuditLogViewerPanel } from "@/lib/codexforge/jarvisd-audit-log-viewer/components";

export default function JarvisdAuditLogPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-audit-log"
      workspaceLabel="Jarvisd Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdAuditLogViewerPanel />
    </CodexForgeAppShell>
  );
}
