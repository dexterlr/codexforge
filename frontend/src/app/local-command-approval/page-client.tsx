"use client";

import { LocalCommandExecutionApprovalGatePanel } from "@/lib/codexforge/local-command-execution-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalCommandApprovalPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-command-approval"
      workspaceLabel="Command Approval"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalCommandExecutionApprovalGatePanel />
    </CodexForgeAppShell>
  );
}
