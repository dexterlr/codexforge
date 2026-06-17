"use client";

import { UniversalExecutionAdapterMvpCandidatePanel } from "@/lib/codexforge/universal-execution-adapter-mvp-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalExecutionAdapterMvpCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-execution-adapter-mvp-candidate"
      workspaceLabel="Universal Execution Adapter MVP Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalExecutionAdapterMvpCandidatePanel />
    </CodexForgeAppShell>
  );
}
