"use client";

import { AdapterBackedExecutionPreviewInventoryPanel } from "@/lib/codexforge/adapter-backed-execution-preview-inventory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterBackedExecutionPreviewInventoryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-backed-execution-preview-inventory"
      workspaceLabel="Adapter-Backed Execution Preview Inventory"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterBackedExecutionPreviewInventoryPanel />
    </CodexForgeAppShell>
  );
}
