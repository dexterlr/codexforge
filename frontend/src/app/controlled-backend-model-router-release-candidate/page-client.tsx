"use client";

import { ControlledBackendModelRouterReleaseCandidatePanel } from "@/lib/codexforge/controlled-backend-model-router-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledBackendModelRouterReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-backend-model-router-release-candidate"
      workspaceLabel="Controlled Backend Model Router Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledBackendModelRouterReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
