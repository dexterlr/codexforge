"use client";

import { BoundedAdapterImplementationSliceInventoryPanel } from "@/lib/codexforge/bounded-adapter-implementation-slice-inventory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BoundedAdapterImplementationSliceInventoryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/bounded-adapter-implementation-slice-inventory"
      workspaceLabel="Bounded Adapter Implementation Slice Inventory"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BoundedAdapterImplementationSliceInventoryPanel />
    </CodexForgeAppShell>
  );
}
