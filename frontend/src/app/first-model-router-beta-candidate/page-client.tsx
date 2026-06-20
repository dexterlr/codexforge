"use client";

import { FirstModelRouterBetaCandidatePanel } from "@/lib/codexforge/first-model-router-beta-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstModelRouterBetaCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-model-router-beta-candidate"
      workspaceLabel="First Model Router Beta Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstModelRouterBetaCandidatePanel />
    </CodexForgeAppShell>
  );
}
