"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RiskZonePreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/risk-zone-preview" workspaceLabel="Risk Zone Preview" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="risk-zone-preview" />
    </CodexForgeAppShell>
  );
}
