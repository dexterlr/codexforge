"use client";

import { ResultStoreAdapterImplementationSlicePanel } from "@/lib/codexforge/result-store-adapter-implementation-slice/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultStoreAdapterImplementationSlicePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-store-adapter-implementation-slice"
      workspaceLabel="Result Store Adapter Implementation Slice"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResultStoreAdapterImplementationSlicePanel />
    </CodexForgeAppShell>
  );
}
