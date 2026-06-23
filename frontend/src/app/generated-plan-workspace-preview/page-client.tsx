"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GeneratedPlanWorkspacePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/generated-plan-workspace-preview"
      workspaceLabel="Generated Plan Workspace Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="generated-plan-workspace-preview" />
    </CodexForgeAppShell>
  );
}
