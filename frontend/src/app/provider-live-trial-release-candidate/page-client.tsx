"use client";

import { ProviderLiveTrialReleaseCandidatePanel } from "@/lib/codexforge/provider-live-trial-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-live-trial-release-candidate"
      workspaceLabel="Provider Live RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderLiveTrialReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
