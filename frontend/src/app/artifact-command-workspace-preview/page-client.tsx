"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ArtifactCommandWorkspacePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/artifact-command-workspace-preview"
      workspaceLabel="Artifact Command Workspace Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="artifact-command-workspace-preview" />
    </CodexForgeAppShell>
  );
}
