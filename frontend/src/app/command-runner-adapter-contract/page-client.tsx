"use client";

import { CommandRunnerAdapterContractPanel } from "@/lib/codexforge/command-runner-adapter-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandRunnerAdapterContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-runner-adapter-contract"
      workspaceLabel="Command Runner Adapter Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRunnerAdapterContractPanel />
    </CodexForgeAppShell>
  );
}
