"use client";

import { PackagingExportControlledTrialPlanPanel } from "@/lib/codexforge/packaging-export-controlled-trial-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PackagingExportControlledTrialPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/packaging-export-controlled-trial-plan"
      workspaceLabel="Packaging Export Controlled Trial Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PackagingExportControlledTrialPlanPanel />
    </CodexForgeAppShell>
  );
}
