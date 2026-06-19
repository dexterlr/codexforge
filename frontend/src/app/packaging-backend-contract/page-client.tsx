"use client";

import { PackagingBackendContractPanel } from "@/lib/codexforge/packaging-backend-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PackagingBackendContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/packaging-backend-contract"
      workspaceLabel="Packaging Backend Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PackagingBackendContractPanel />
    </CodexForgeAppShell>
  );
}
