"use client";

import { LocalRuntimeAdapterImplementationSlicePanel } from "@/lib/codexforge/local-runtime-adapter-implementation-slice/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalRuntimeAdapterImplementationSlicePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-runtime-adapter-implementation-slice"
      workspaceLabel="Local Runtime Adapter Implementation Slice"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalRuntimeAdapterImplementationSlicePanel />
    </CodexForgeAppShell>
  );
}
