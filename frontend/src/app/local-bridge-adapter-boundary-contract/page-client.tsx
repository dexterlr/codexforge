"use client";

import { LocalBridgeAdapterBoundaryContractPanel } from "@/lib/codexforge/local-bridge-adapter-boundary-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalBridgeAdapterBoundaryContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-bridge-adapter-boundary-contract"
      workspaceLabel="Local Bridge Adapter Boundary Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalBridgeAdapterBoundaryContractPanel />
    </CodexForgeAppShell>
  );
}
