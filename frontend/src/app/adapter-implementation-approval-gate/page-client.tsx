"use client";

import { AdapterImplementationApprovalGatePanel } from "@/lib/codexforge/adapter-implementation-approval-gate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AdapterImplementationApprovalGatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/adapter-implementation-approval-gate"
      workspaceLabel="Adapter Implementation Approval Gate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AdapterImplementationApprovalGatePanel />
    </CodexForgeAppShell>
  );
}
