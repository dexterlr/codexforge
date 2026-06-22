"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WorkspaceIdentityPacketPageClient() {
  return (
    <CodexForgeAppShell activePath="/workspace-identity-packet" workspaceLabel="Workspace Identity Packet" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="workspace-identity-packet" />
    </CodexForgeAppShell>
  );
}
