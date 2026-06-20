"use client";

import { FirstControlledProviderTrialCandidatePanel } from "@/lib/codexforge/first-controlled-provider-trial-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstControlledProviderTrialCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-controlled-provider-trial-candidate"
      workspaceLabel="First Controlled Provider Trial Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstControlledProviderTrialCandidatePanel />
    </CodexForgeAppShell>
  );
}
