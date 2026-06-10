"use client";

import { FoundationBetaCandidatePanel } from "@/lib/codexforge/foundation-beta-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FoundationBetaCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/foundation-beta-candidate"
      workspaceLabel="Beta Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FoundationBetaCandidatePanel />
    </CodexForgeAppShell>
  );
}
