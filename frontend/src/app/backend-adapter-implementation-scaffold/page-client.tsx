"use client";

import { BackendAdapterImplementationScaffoldPanel } from "@/lib/codexforge/backend-adapter-implementation-scaffold/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendAdapterImplementationScaffoldPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-adapter-implementation-scaffold"
      workspaceLabel="Backend Adapter Implementation Scaffold"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendAdapterImplementationScaffoldPanel />
    </CodexForgeAppShell>
  );
}
