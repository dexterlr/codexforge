"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DomainArtifactPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/domain-artifact-plan-preview"
      workspaceLabel="Domain Artifact Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="domain-artifact-plan-preview" />
    </CodexForgeAppShell>
  );
}
