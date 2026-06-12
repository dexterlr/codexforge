"use client";

import { LocalModelIntegrationReleaseCandidatePanel } from "@/lib/codexforge/local-model-integration-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelIntegrationReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-integration-release-candidate"
      workspaceLabel="Local Integration RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelIntegrationReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
