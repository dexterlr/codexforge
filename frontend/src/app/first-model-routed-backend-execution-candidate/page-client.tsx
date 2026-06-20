"use client";

import { FirstModelRoutedBackendExecutionCandidatePanel } from "@/lib/codexforge/first-model-routed-backend-execution-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstModelRoutedBackendExecutionCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-model-routed-backend-execution-candidate"
      workspaceLabel="First Model-Routed Backend Execution Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstModelRoutedBackendExecutionCandidatePanel />
    </CodexForgeAppShell>
  );
}
