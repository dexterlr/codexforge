"use client";

import { EvidenceStoreBackendContractPanel } from "@/lib/codexforge/evidence-store-backend-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceStoreBackendContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-store-backend-contract"
      workspaceLabel="Evidence Store Backend Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EvidenceStoreBackendContractPanel />
    </CodexForgeAppShell>
  );
}
