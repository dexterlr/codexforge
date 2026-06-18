"use client";

import { FirstRealAdapterMvpCandidatePanel } from "@/lib/codexforge/first-real-adapter-mvp-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstRealAdapterMvpCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-real-adapter-mvp-candidate"
      workspaceLabel="First Real Adapter MVP Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstRealAdapterMvpCandidatePanel />
    </CodexForgeAppShell>
  );
}
