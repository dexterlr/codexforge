"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function NextActionRailPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/next-action-rail-preview"
      workspaceLabel="Next Action Rail Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="next-action-rail-preview" />
    </CodexForgeAppShell>
  );
}
