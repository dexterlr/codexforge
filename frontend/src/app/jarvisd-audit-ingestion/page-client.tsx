"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { JarvisdAuditEventIngestionPanel } from "@/lib/codexforge/jarvisd-audit-event-ingestion/components";

export default function JarvisdAuditIngestionPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/jarvisd-audit-ingestion"
      workspaceLabel="Jarvisd Audit Ingestion"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <JarvisdAuditEventIngestionPanel />
    </CodexForgeAppShell>
  );
}
