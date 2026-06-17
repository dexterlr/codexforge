"use client";

import { ExecutionAdapterContractInventoryPanel } from "@/lib/codexforge/execution-adapter-contract-inventory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExecutionAdapterContractInventoryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/execution-adapter-contract-inventory"
      workspaceLabel="Execution Adapter Contract Inventory"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ExecutionAdapterContractInventoryPanel />
    </CodexForgeAppShell>
  );
}
