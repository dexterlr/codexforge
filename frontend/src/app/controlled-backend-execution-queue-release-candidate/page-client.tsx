"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledBackendExecutionQueueReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-backend-execution-queue-release-candidate"
      workspaceLabel="Controlled Backend Execution Queue Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="controlled-backend-execution-queue-release-candidate" />
    </CodexForgeAppShell>
  );
}
