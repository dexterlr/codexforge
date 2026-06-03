"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderGovernanceReleaseAuditPanel } from "@/lib/codexforge/provider-governance-release-audit/components";

export default function ProviderGovernanceReleaseAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-governance-release-audit"
      workspaceLabel="Governance Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderGovernanceReleaseAuditPanel />
    </CodexForgeAppShell>
  );
}
