"use client";

import { ControlledModelUseDryRunInventoryPanel } from "@/lib/codexforge/controlled-model-use-dry-run-inventory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledModelUseDryRunInventoryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-model-use-dry-run-inventory"
      workspaceLabel="Controlled Model Use Dry-Run Inventory"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledModelUseDryRunInventoryPanel />
    </CodexForgeAppShell>
  );
}

