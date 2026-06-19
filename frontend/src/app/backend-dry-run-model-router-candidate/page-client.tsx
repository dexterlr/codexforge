"use client";

import { BackendDryRunModelRouterCandidatePanel } from "@/lib/codexforge/backend-dry-run-model-router-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendDryRunModelRouterCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-dry-run-model-router-candidate"
      workspaceLabel="Backend Dry-Run Model Router Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendDryRunModelRouterCandidatePanel />
    </CodexForgeAppShell>
  );
}
