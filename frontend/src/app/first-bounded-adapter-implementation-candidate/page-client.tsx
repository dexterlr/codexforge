"use client";

import { FirstBoundedAdapterImplementationCandidatePanel } from "@/lib/codexforge/first-bounded-adapter-implementation-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstBoundedAdapterImplementationCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-bounded-adapter-implementation-candidate"
      workspaceLabel="First Bounded Adapter Implementation Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstBoundedAdapterImplementationCandidatePanel />
    </CodexForgeAppShell>
  );
}
