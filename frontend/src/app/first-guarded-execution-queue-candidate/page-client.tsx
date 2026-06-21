"use client";

import { FirstGuardedExecutionQueueCandidatePanel } from "@/lib/codexforge/first-guarded-execution-queue-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstGuardedExecutionQueueCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-guarded-execution-queue-candidate"
      workspaceLabel="First Guarded Execution Queue Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstGuardedExecutionQueueCandidatePanel />
    </CodexForgeAppShell>
  );
}
