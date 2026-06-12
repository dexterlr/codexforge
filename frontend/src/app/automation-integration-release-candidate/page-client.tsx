"use client";

import { AutomationIntegrationReleaseCandidatePanel } from "@/lib/codexforge/automation-integration-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationIntegrationReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-integration-release-candidate"
      workspaceLabel="Automation Integration RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationIntegrationReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
