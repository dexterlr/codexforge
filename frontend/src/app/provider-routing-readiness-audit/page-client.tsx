"use client";

import { ProviderRoutingReadinessAuditPanel } from "@/lib/codexforge/provider-routing-readiness-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderRoutingReadinessAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-routing-readiness-audit"
      workspaceLabel="Provider Routing Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderRoutingReadinessAuditPanel />
    </CodexForgeAppShell>
  );
}
