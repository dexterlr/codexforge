"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryAuditWorkspacePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-audit-workspace-preview"
      workspaceLabel="Recovery Audit Workspace Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="recovery-audit-workspace-preview" />
    </CodexForgeAppShell>
  );
}
