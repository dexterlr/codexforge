"use client";

import { AdapterImplementationReleaseHandoffPanel } from "@/lib/codexforge/adapter-implementation-release-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterImplementationReleaseHandoffPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-implementation-release-handoff"
      workspaceLabel="Adapter Implementation Release Handoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterImplementationReleaseHandoffPanel />
    </CodexForgeAppShell>
  );
}
