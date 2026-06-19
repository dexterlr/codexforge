"use client";

import { CommandRunnerAdapterBackendContractPanel } from "@/lib/codexforge/command-runner-adapter-backend-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandRunnerAdapterBackendContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-runner-adapter-backend-contract"
      workspaceLabel="Command Runner Adapter Backend Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerAdapterBackendContractPanel />
    </CodexForgeAppShell>
  );
}
