"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceNeedsPreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/evidence-needs-preview" workspaceLabel="Evidence Needs Preview" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="evidence-needs-preview" />
    </CodexForgeAppShell>
  );
}
