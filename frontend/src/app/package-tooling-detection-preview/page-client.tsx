"use client";

import { ProjectContextBrainRoutePanel } from "@/lib/codexforge/project-context-brain/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PackageToolingDetectionPreviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/package-tooling-detection-preview" workspaceLabel="Package Tooling Detection Preview" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProjectContextBrainRoutePanel routeSlug="package-tooling-detection-preview" />
    </CodexForgeAppShell>
  );
}
