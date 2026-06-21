"use client";

import { CommandRecoveryContractPanel } from "@/lib/codexforge/command-recovery-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandRecoveryContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-recovery-contract"
      workspaceLabel="Command Recovery Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandRecoveryContractPanel />
    </CodexForgeAppShell>
  );
}
