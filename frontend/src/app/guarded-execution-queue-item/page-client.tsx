"use client";

import { GuardedExecutionQueueItemPanel } from "@/lib/codexforge/guarded-execution-queue-item/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedExecutionQueueItemPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-execution-queue-item"
      workspaceLabel="Guarded Execution Queue Item"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedExecutionQueueItemPanel />
    </CodexForgeAppShell>
  );
}
