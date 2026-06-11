"use client";

import { LocalBridgeReadinessAuditPanel } from "@/lib/codexforge/local-bridge-readiness-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalBridgeReadinessAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-bridge-readiness-audit"
      workspaceLabel="Local Bridge Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalBridgeReadinessAuditPanel />
    </CodexForgeAppShell>
  );
}
