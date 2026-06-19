"use client";

import { FirstAdapterExecutionBetaCandidatePanel } from "@/lib/codexforge/first-adapter-execution-beta-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstAdapterExecutionBetaCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-adapter-execution-beta-candidate"
      workspaceLabel="First Adapter Execution Beta Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstAdapterExecutionBetaCandidatePanel />
    </CodexForgeAppShell>
  );
}
