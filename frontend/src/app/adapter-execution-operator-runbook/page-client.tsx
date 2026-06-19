"use client";

import { AdapterExecutionOperatorRunbookPanel } from "@/lib/codexforge/adapter-execution-operator-runbook/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterExecutionOperatorRunbookPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-execution-operator-runbook"
      workspaceLabel="Adapter Execution Operator Runbook"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterExecutionOperatorRunbookPanel />
    </CodexForgeAppShell>
  );
}
