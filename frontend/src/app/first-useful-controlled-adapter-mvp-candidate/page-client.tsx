"use client";

import { FirstUsefulControlledAdapterMvpCandidatePanel } from "@/lib/codexforge/first-useful-controlled-adapter-mvp-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstUsefulControlledAdapterMvpCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-useful-controlled-adapter-mvp-candidate"
      workspaceLabel="First Useful Controlled Adapter MVP Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstUsefulControlledAdapterMvpCandidatePanel />
    </CodexForgeAppShell>
  );
}
