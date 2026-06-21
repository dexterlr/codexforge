"use client";

import { GuardedExecutionPreflightChecklistPanel } from "@/lib/codexforge/guarded-execution-preflight-checklist/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedExecutionPreflightChecklistPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-execution-preflight-checklist"
      workspaceLabel="Guarded Execution Preflight Checklist"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedExecutionPreflightChecklistPanel />
    </CodexForgeAppShell>
  );
}
