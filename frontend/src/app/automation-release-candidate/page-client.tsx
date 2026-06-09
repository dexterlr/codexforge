"use client";

import { AutomationReleaseCandidatePanel } from "@/lib/codexforge/automation-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-release-candidate"
      workspaceLabel="Automation Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
