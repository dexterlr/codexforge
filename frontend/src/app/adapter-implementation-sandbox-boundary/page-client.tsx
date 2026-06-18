"use client";

import { AdapterImplementationSandboxBoundaryPanel } from "@/lib/codexforge/adapter-implementation-sandbox-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterImplementationSandboxBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-implementation-sandbox-boundary"
      workspaceLabel="Adapter Implementation Sandbox Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterImplementationSandboxBoundaryPanel />
    </CodexForgeAppShell>
  );
}
