"use client";

import { RealAdapterAuditWiringPlanPanel } from "@/lib/codexforge/real-adapter-audit-wiring-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealAdapterAuditWiringPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-adapter-audit-wiring-plan"
      workspaceLabel="Real Adapter Audit Wiring Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealAdapterAuditWiringPlanPanel />
    </CodexForgeAppShell>
  );
}
