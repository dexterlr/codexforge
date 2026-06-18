"use client";

import { AutomationAdapterImplementationPlanPanel } from "@/lib/codexforge/automation-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-adapter-implementation-plan"
      workspaceLabel="Automation Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
