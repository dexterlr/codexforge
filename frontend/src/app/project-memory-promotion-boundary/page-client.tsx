"use client";

import { ProjectMemoryPromotionBoundaryPanel } from "@/lib/codexforge/project-memory-promotion-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProjectMemoryPromotionBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/project-memory-promotion-boundary"
      workspaceLabel="Memory Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProjectMemoryPromotionBoundaryPanel />
    </CodexForgeAppShell>
  );
}
