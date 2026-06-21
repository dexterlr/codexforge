"use client";

import { ControlledGuardedExecutionQueueReleaseCandidatePanel } from "@/lib/codexforge/controlled-guarded-execution-queue-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledGuardedExecutionQueueReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-guarded-execution-queue-release-candidate"
      workspaceLabel="Controlled Guarded Execution Queue Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledGuardedExecutionQueueReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
