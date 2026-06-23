"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstModelRouterV2CandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-model-router-v2-candidate"
      workspaceLabel="First Model Router v2 Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="first-model-router-v2-candidate" />
    </CodexForgeAppShell>
  );
}
