"use client";

import { CommandFailureRecoveryFlowPanel } from "@/lib/codexforge/command-failure-recovery-flow/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandFailureRecoveryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-failure-recovery"
      workspaceLabel="Command Recovery"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandFailureRecoveryFlowPanel />
    </CodexForgeAppShell>
  );
}
