"use client";

import { PackagingAdapterImplementationSlicePanel } from "@/lib/codexforge/packaging-adapter-implementation-slice/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PackagingAdapterImplementationSlicePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/packaging-adapter-implementation-slice"
      workspaceLabel="Packaging Adapter Implementation Slice"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PackagingAdapterImplementationSlicePanel />
    </CodexForgeAppShell>
  );
}
