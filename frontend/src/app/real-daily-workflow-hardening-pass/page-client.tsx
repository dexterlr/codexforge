"use client";

import { RealDailyWorkflowHardeningPassPanel } from "@/lib/codexforge/real-daily-workflow-hardening-pass/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-daily-workflow-hardening-pass"
      workspaceLabel="Hardening Pass"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealDailyWorkflowHardeningPassPanel />
    </CodexForgeAppShell>
  );
}
