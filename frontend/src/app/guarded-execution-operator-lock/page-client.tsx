"use client";

import { GuardedExecutionOperatorLockPanel } from "@/lib/codexforge/guarded-execution-operator-lock/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedExecutionOperatorLockPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-execution-operator-lock"
      workspaceLabel="Guarded Execution Operator Lock"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedExecutionOperatorLockPanel />
    </CodexForgeAppShell>
  );
}
