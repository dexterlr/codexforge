"use client";

import { LocalRuntimeAdapterBackendContractPanel } from "@/lib/codexforge/local-runtime-adapter-backend-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalRuntimeAdapterBackendContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-runtime-adapter-backend-contract"
      workspaceLabel="Local Runtime Adapter Backend Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalRuntimeAdapterBackendContractPanel />
    </CodexForgeAppShell>
  );
}
