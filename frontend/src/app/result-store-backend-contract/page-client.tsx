"use client";

import { ResultStoreBackendContractPanel } from "@/lib/codexforge/result-store-backend-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultStoreBackendContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-store-backend-contract"
      workspaceLabel="Result Store Backend Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResultStoreBackendContractPanel />
    </CodexForgeAppShell>
  );
}
