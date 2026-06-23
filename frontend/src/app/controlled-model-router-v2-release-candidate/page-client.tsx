"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledModelRouterV2ReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-model-router-v2-release-candidate"
      workspaceLabel="Controlled Model Router v2 Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="controlled-model-router-v2-release-candidate" />
    </CodexForgeAppShell>
  );
}
