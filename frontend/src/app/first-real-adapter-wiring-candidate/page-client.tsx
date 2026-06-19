"use client";

import { FirstRealAdapterWiringCandidatePanel } from "@/lib/codexforge/first-real-adapter-wiring-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstRealAdapterWiringCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-real-adapter-wiring-candidate"
      workspaceLabel="First Real Adapter Wiring Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstRealAdapterWiringCandidatePanel />
    </CodexForgeAppShell>
  );
}
