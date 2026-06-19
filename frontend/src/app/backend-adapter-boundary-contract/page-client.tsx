"use client";

import { BackendAdapterBoundaryContractPanel } from "@/lib/codexforge/backend-adapter-boundary-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendAdapterBoundaryContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-adapter-boundary-contract"
      workspaceLabel="Backend Adapter Boundary Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendAdapterBoundaryContractPanel />
    </CodexForgeAppShell>
  );
}
