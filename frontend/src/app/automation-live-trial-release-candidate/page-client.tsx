"use client";

import { AutomationLiveTrialReleaseCandidatePanel } from "@/lib/codexforge/automation-live-trial-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationLiveTrialReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-live-trial-release-candidate"
      workspaceLabel="Automation Live RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationLiveTrialReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
