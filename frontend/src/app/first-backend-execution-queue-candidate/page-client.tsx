"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstBackendExecutionQueueCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-backend-execution-queue-candidate"
      workspaceLabel="First Backend Execution Queue Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="first-backend-execution-queue-candidate" />
    </CodexForgeAppShell>
  );
}
