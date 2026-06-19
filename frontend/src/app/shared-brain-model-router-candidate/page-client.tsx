"use client";

import { SharedBrainModelRouterCandidatePanel } from "@/lib/codexforge/shared-brain-model-router-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SharedBrainModelRouterCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/shared-brain-model-router-candidate"
      workspaceLabel="Shared Brain Model Router Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SharedBrainModelRouterCandidatePanel />
    </CodexForgeAppShell>
  );
}
