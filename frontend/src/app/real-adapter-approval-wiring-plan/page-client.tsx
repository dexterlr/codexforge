"use client";

import { RealAdapterApprovalWiringPlanPanel } from "@/lib/codexforge/real-adapter-approval-wiring-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealAdapterApprovalWiringPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-adapter-approval-wiring-plan"
      workspaceLabel="Real Adapter Approval Wiring Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealAdapterApprovalWiringPlanPanel />
    </CodexForgeAppShell>
  );
}
