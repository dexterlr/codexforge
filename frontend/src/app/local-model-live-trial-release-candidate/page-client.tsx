"use client";

import { LocalModelLiveTrialReleaseCandidatePanel } from "@/lib/codexforge/local-model-live-trial-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-live-trial-release-candidate"
      workspaceLabel="Local Model Live RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelLiveTrialReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
