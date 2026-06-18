"use client";

import { FirstBoundedAdapterImplementationLayerCandidatePanel } from "@/lib/codexforge/first-bounded-adapter-implementation-layer-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstBoundedAdapterImplementationLayerCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-bounded-adapter-implementation-layer-candidate"
      workspaceLabel="First Bounded Adapter Implementation Layer Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstBoundedAdapterImplementationLayerCandidatePanel />
    </CodexForgeAppShell>
  );
}
