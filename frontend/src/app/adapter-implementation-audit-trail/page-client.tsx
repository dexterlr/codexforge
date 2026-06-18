"use client";

import { AdapterImplementationAuditTrailPanel } from "@/lib/codexforge/adapter-implementation-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterImplementationAuditTrailPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-implementation-audit-trail"
      workspaceLabel="Adapter Implementation Audit Trail"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterImplementationAuditTrailPanel />
    </CodexForgeAppShell>
  );
}
