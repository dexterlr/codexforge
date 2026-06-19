"use client";

import { AdapterBackendSandboxContractPanel } from "@/lib/codexforge/adapter-backend-sandbox-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterBackendSandboxContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-backend-sandbox-contract"
      workspaceLabel="Adapter Backend Sandbox Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterBackendSandboxContractPanel />
    </CodexForgeAppShell>
  );
}
