"use client";

import { CodexForgeLiveIntegrationReleaseCandidatePanel } from "@/lib/codexforge/codexforge-live-integration-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodexForgeLiveIntegrationReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/codexforge-live-integration-release-candidate"
      workspaceLabel="Live Integration RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CodexForgeLiveIntegrationReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
