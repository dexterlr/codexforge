"use client";

import { ProviderGovernanceMvpAuditPanel } from "@/lib/codexforge/provider-governance-mvp-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderGovernanceMvpAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-governance-mvp-audit"
      workspaceLabel="MVP Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderGovernanceMvpAuditPanel />
    </CodexForgeAppShell>
  );
}
