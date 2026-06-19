"use client";

import { BroadControlledBuilderBetaCandidatePanel } from "@/lib/codexforge/broad-controlled-builder-beta-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BroadControlledBuilderBetaCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/broad-controlled-builder-beta-candidate"
      workspaceLabel="Broad Controlled Builder Beta Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BroadControlledBuilderBetaCandidatePanel />
    </CodexForgeAppShell>
  );
}
