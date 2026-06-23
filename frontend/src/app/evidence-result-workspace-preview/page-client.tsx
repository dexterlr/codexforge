"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceResultWorkspacePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-result-workspace-preview"
      workspaceLabel="Evidence Result Workspace Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="evidence-result-workspace-preview" />
    </CodexForgeAppShell>
  );
}
